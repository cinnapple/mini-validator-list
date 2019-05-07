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
    dimensions: ["GeoLocation.domain", "GeoLocation.city"],
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
      cityField: "GeoLocation.city"
    }
  }
});

export { drilldownDomainMapOperatorQuery };
