import { IQueryItem, IWorldMapOptions, SupportedCharts } from "../../../types";

const drilldownDomainMapOperatorQuery = (
  domain: string
): IQueryItem<IWorldMapOptions> => ({
  title: "Operator Location",
  type: SupportedCharts.Map,
  bordered: false,
  query: {
    measures: [
      "GeoLocation.latitude",
      "GeoLocation.longitude",
      "GeoLocation.unlSum",
      "GeoLocation.altNetChainSum",
      "GeoLocation.validatorCount"
    ],
    dimensions: [
      "GeoLocation.domain",
      "GeoLocation.city",
      "GeoLocation.countryName",
      "Profiles_GeoLocation.icon"
    ],
    filters: [
      {
        dimension: "GeoLocation.domain",
        operator: "equals",
        values: [domain]
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
});

export { drilldownDomainMapOperatorQuery };
