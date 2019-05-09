import { injectable, inject, TYPES } from "../di";
import {
  IGetTopologyNodesResponse,
  HashTable,
  ILedgerEventArg,
  IValidationEventArg,
  IStore,
  IDbManifests,
  IRippleLibApi,
  IRippleDataApi,
  IDbValidatorSchema,
  RealtimeLedgerData,
  RealtimeValidationData,
  IRippleLibApiConfig
} from "../types";
import { RippleAPI } from "ripple-lib";
import * as debug from "debug";
const _d = debug("etl:RippleLibApi");

const WS_PORT = 51233;

@injectable()
class RippleLibApi implements IRippleLibApi {
  private readonly nodes: HashTable<RippleAPI>;
  private readonly _masterKeys: HashTable<string>;
  private _validatros: HashTable<IDbValidatorSchema>;
  private _currentLedgers: HashTable<string>;
  private _currentLedgerHash: string;
  private _lastLedgerClosedTime: number;

  constructor(
    @inject(TYPES.Store) private _store: IStore,
    @inject(TYPES.RippleDataApi) private _rippleDataApi: IRippleDataApi
  ) {
    this.nodes = {};
    this._masterKeys = {};
    this._validatros = {};
    this._currentLedgers = {};
  }

  private onError = (
    nodePublicKey: string,
    errorCode: any,
    errorMessage: any
  ) => {
    _d(`error: ${nodePublicKey}, code: ${errorCode}, message: ${errorMessage}`);
  };

  private onConnected = (
    nodePublicKey: string,
    subscription: RippleAPI,
    server: string
  ) => {
    // connected
    _d(`connected: ${nodePublicKey}, server: ${server}`);
    this.nodes[nodePublicKey] = subscription;
    _d(`connection count: ${Object.keys(this.nodes).length}`);
  };

  private onDisconnected = (nodePublicKey: string, code: any) => {
    _d(`disconnected: ${nodePublicKey}, code: ${JSON.stringify(code)}`);
    if (this.nodes[nodePublicKey]) {
      delete this.nodes[nodePublicKey];
    }
    _d(`connection count: ${Object.keys(this.nodes).length}`);
  };

  private getDomain = (key: string) =>
    this._validatros[key] ? this._validatros[key].domain : "";

  private onLedger = (
    nodePublicKey: string,
    ledger: ILedgerEventArg,
    handler: any
  ) => {
    const createdLedgerCount: HashTable<number> = {};
    const total = Object.keys(this._validatros).length;
    const quorum = (2 / 3) * total;
    const elapsed = Object.keys(this._currentLedgers).forEach(
      masterPublicKey => {
        if (!createdLedgerCount[this._currentLedgers[masterPublicKey]]) {
          createdLedgerCount[this._currentLedgers[masterPublicKey]] = 0;
        }
        createdLedgerCount[this._currentLedgers[masterPublicKey]]++;
      }
    );

    // if 2/3 of validators agree to the same hash, consider it to be the new ledger for the  main-net
    if (this._currentLedgerHash !== ledger.ledgerHash) {
      let count = 0;
      for (let masterPublicKey in this._validatros) {
        if (this._currentLedgers[masterPublicKey] === ledger.ledgerHash) {
          count++;
        }
        if (count >= quorum) {
          this._currentLedgerHash = ledger.ledgerHash;
          const ledgerClosedTime = new Date().getTime();
          const elapsedMs = ledgerClosedTime - this._lastLedgerClosedTime;

          handler({
            ...ledger,
            validation_public_key: masterPublicKey,
            domain: this.getDomain(masterPublicKey),
            elapsedSeconds: elapsedMs / 1000
          } as RealtimeLedgerData);

          this._lastLedgerClosedTime = ledgerClosedTime;
          break;
        }
      }
    }
  };

  private onValidationReceived = (
    validation: IValidationEventArg,
    handler: any
  ) => {
    const masterPublicKey = this._masterKeys[validation.validation_public_key];
    const validator = this._validatros[masterPublicKey];
    if (validator) {
      if (this._currentLedgers[masterPublicKey] !== validation.ledger_hash) {
        this._currentLedgers[masterPublicKey] = validation.ledger_hash;
        handler({
          ...validation,
          validation_public_key: masterPublicKey,
          domain: validator.domain
        } as RealtimeValidationData);
      }
    }
  };

  private _subscribeToNodes = (
    data: IGetTopologyNodesResponse[],
    config: IRippleLibApiConfig
  ) => {
    data = config.maxConnections ? data.slice(0, config.maxConnections) : data;
    data.forEach(node => {
      if (node.ip && node.port) {
        const server = `ws://${node.ip}:${WS_PORT}`;
        const subscription = new RippleAPI({
          server
        });
        subscription.on(`connected`, () =>
          this.onConnected(node.node_public_key, subscription, server)
        );
        subscription.on(`error`, (errorCode, errorMessage) =>
          this.onError(node.node_public_key, errorCode, errorMessage)
        );
        subscription.on(`disconnected`, code =>
          this.onDisconnected(node.node_public_key, code)
        );
        subscription.on(`ledger`, ledger =>
          this.onLedger(node.node_public_key, ledger, config.handleLedger)
        );
        subscription
          .connect()
          .then(async () => {
            subscription.connection.on(`validationReceived`, data =>
              this.onValidationReceived(data, config.handleValidation)
            );
            try {
              return subscription.request("subscribe", {
                streams: ["validations"]
              });
            } catch (error) {
              this.onError(
                node.node_public_key,
                `STREAM_SUBSCRIPTION_FAILED`,
                error
              );
            }
          })
          .catch(error => this.onDisconnected(node.node_public_key, error));
      }
    });
  };

  private populateData = () => {
    const populateMasterKeys = async () => {
      _d(`populating manifest keys...`);
      const data = await this._store.get<IDbManifests>(`
     select *
       from manifests
       `);
      data.forEach(
        d =>
          d.ephemeral_public_key &&
          (this._masterKeys[d.ephemeral_public_key] = d.master_public_key)
      );
    };
    const populateValidators = async () => {
      _d(`populating validators...`);
      const data = await this._store.get<IDbValidatorSchema>(`
     select validation_public_key
          , domain
          , chain
       from m_validatordetails
      where unl = true and chain <> 'altnet'
       `);
      data.forEach(d => (this._validatros[d.validation_public_key] = d));
    };
    const populate = () =>
      Promise.all([populateMasterKeys(), populateValidators()]);
    // re-populate every 10 seconds
    setInterval(populate, 10 * 1000);
    return populate();
  };

  subscribe(config: IRippleLibApiConfig) {
    return this.populateData()
      .then(this._rippleDataApi.getTopologyNodes)
      .then(data => this._subscribeToNodes(data, config));
  }
}

export default RippleLibApi;
