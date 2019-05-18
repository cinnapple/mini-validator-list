import {
  IQueryItem,
  IProfileChartOptions,
  SupportedCharts
} from "../../../types";

const drilldownProfileQuery = (
  domain: string
): IQueryItem<IProfileChartOptions> => ({
  title: `Operator`,
  type: SupportedCharts.DomainProfile,
  query: {
    dimensions: [
      "Vw_DomainDetails.domain",
      "Vw_DomainDetails.name",
      "Vw_DomainDetails.description",
      "Vw_DomainDetails.twitter",
      "Vw_DomainDetails.web",
      "Vw_DomainDetails.icon",
      "Vw_DomainDetails.country_name",
      "Vw_DomainDetails.continent_name",
      "Vw_DomainDetails.city"
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
      nameField: "Vw_DomainDetails.name",
      domainField: "Vw_DomainDetails.domain",
      twitterField: "Vw_DomainDetails.twitter",
      descriptionField: "Vw_DomainDetails.description",
      iconField: "Vw_DomainDetails.icon"
    }
  }
});

export { drilldownProfileQuery };
