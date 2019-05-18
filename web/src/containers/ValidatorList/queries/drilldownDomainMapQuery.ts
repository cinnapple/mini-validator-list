import { IQueryItem, IWorldMapOptions, SupportedCharts } from "../../../types";

const drilldownDomainMapOperatorQuery = (
  domain: string
): IQueryItem<IWorldMapOptions> => ({
  title: "Operator Location",
  type: SupportedCharts.Map,
  query: {
    dimensions: [
      "Vw_DomainDetails.domain",
      "Vw_DomainDetails.city",
      "Vw_DomainDetails.country_name",
      "Vw_DomainDetails.latitude",
      "Vw_DomainDetails.longitude",
      "Vw_DomainDetails.unl_count",
      "Vw_DomainDetails.icon"
    ],
    filters: [
      {
        dimension: "Vw_DomainDetails.domain",
        operator: "equals",
        values: [domain]
      }
    ]
  },
  options: {
    props: {
      domainField: "Vw_DomainDetails.domain",
      latitudeField: "Vw_DomainDetails.latitude",
      longitudeField: "Vw_DomainDetails.longitude",
      cityField: "Vw_DomainDetails.city",
      countryNameField: "Vw_DomainDetails.country_name",
      iconField: "Vw_DomainDetails.icon"
    }
  }
});

export { drilldownDomainMapOperatorQuery };
