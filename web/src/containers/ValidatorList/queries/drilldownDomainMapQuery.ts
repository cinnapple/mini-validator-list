import {
  IQueryItem,
  IWorldMapOptions,
  SupportedCharts,
  ISelectedValue
} from "../../../types";

const drilldownDomainMapOperatorQuery = (
  opt: ISelectedValue
): IQueryItem<IWorldMapOptions> => ({
  title: "Operator Location",
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
        dimension: "GeoLocation.domain",
        operator: "equals",
        values: [opt.selected["ValidatorsWithGeo.domain"]]
      }
    ]
  },
  options: { props: {} }
});

export { drilldownDomainMapOperatorQuery };
