import * as grpc from "grpc";
import * as Redis from "ioredis";
import * as debug from "debug";
import { loadEchoService } from "./grpcServiceLoader";
const _d = debug("streaming:Server");
const redisSub = new Redis(`redis://redis_db:6379/0`);

const handleNewLedgerCreated = (ledger: any, call: any) => {
  call.write({
    hash: ledger.ledger_hash,
    key: ledger.validation_public_key + ledger.elapsedSeconds
  });
};

const handleValidationReceived = (
  validation: any & { domain: string },
  call: any
) => {
  call.write({
    hash: validation.ledger_hash,
    key: validation.validation_public_key
  });
};

redisSub.subscribe("validationReceived", "newLedgerCreated");

// ------------------------------------------------
// echo service setup
// ------------------------------------------------

function copyMetadata(call: any) {
  var metadata = call.metadata.getMap();
  var response_metadata = new grpc.Metadata();
  for (var key in metadata) {
    response_metadata.set(key, metadata[key]);
  }
  return response_metadata;
}

const echoService = {
  service: loadEchoService().EchoService.service,
  actions: {
    echo: (call: any, callback: any) => {
      callback(
        null,
        {
          message: call.request.message
        },
        copyMetadata(call)
      );
    },
    echoAbort: (call: any, callback: any) => {
      callback({
        code: grpc.status.ABORTED,
        message: "Aborted from server side."
      });
    },
    serverStreamingEcho: (call: any) => {
      redisSub.on("message", (channel, message) => {
        if (channel === "validationReceived") {
          handleValidationReceived(JSON.parse(message), call);
        }
        if (channel === "newLedgerCreated") {
          handleNewLedgerCreated(JSON.parse(message), call);
        }
      });
      // call.end(copyMetadata(call));
    }
  }
};

// ------------------------------------------------
// grpc setup
// ------------------------------------------------

const getServer = () => {
  var server = new grpc.Server();
  server.addService(echoService.service, echoService.actions);
  return server;
};

if (require.main === module) {
  const server = getServer();
  server.bind("0.0.0.0:9090", grpc.ServerCredentials.createInsecure());
  server.start();
}

exports.getServer = getServer;
