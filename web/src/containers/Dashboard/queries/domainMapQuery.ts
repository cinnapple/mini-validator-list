import { IQueryItem, IWorldMapOptions, SupportedCharts } from "../../../types";

const unlOperatorMapQuery: IQueryItem<IWorldMapOptions> = {
  title: "UNL Operator Map",
  type: SupportedCharts.Map,
  query: {
    measures: [
      "GeoLocation.latitude",
      "GeoLocation.longitude",
      "GeoLocation.unlSum",
      "GeoLocation.altNetChainSum"
    ],
    dimensions: [
      "GeoLocation.domain",
      "GeoLocation.city",
      "GeoLocation.countryName",
      "Profiles_GeoLocation.icon"
    ],
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
      cityField: "GeoLocation.city",
      countryNameField: "GeoLocation.countryName",
      iconField: "Profiles_GeoLocation.icon"
    }
  }
};

export { unlOperatorMapQuery };
