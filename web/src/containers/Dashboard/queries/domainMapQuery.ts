import { IQueryItem, IWorldMapOptions, SupportedCharts } from "../../../types";

const unlOperatorMapQuery: IQueryItem<IWorldMapOptions> = {
  title: "UNL Operator Map",
  type: SupportedCharts.Map,
  query: {
    measures: [
      "GeoLocation.latitude",
      "GeoLocation.longitude",
      "GeoLocation.unlSum",
      "GeoLocation.altNetChainSum",
      "GeoLocation.validatorCount"
    ],
    dimensions: ["GeoLocation.domain", "GeoLocation.city"],
    filters: [
      {
        // exclude test net
        dimension: "GeoLocation.altNetChainSum",
        operator: "equals",
        values: ["0"]
      },
      {
        // exclude test net
        dimension: "MainNetValidators.chain",
        operator: "notEquals",
        values: ["altnet"]
      }
    ]
  },
  options: {
    props: {
      domainField: "GeoLocation.domain",
      latitudeField: "GeoLocation.latitude",
      longitudeField: "GeoLocation.longitude",
      cityField: "GeoLocation.city"
    }
  }
};

export { unlOperatorMapQuery };
