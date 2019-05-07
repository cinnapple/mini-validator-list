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
  bordered: false,
  query: {
    dimensions: [
      "Profiles_GeoLocation.domain",
      "Profiles_GeoLocation.name",
      "Profiles_GeoLocation.description",
      "Profiles_GeoLocation.twitter",
      "Profiles_GeoLocation.web",
      "Profiles_GeoLocation.icon",
      "Profiles_GeoLocation.countryName",
      "Profiles_GeoLocation.continentName",
      "Profiles_GeoLocation.city"
    ],
    filters: [
      {
        dimension: "Profiles_GeoLocation.domain",
        operator: "equals",
        values: [domain]
      }
    ]
  },
  options: {
    props: {
      nameField: "Profiles_GeoLocation.name",
      domainField: "Profiles_GeoLocation.domain",
      twitterField: "Profiles_GeoLocation.twitter",
      descriptionField: "Profiles_GeoLocation.description",
      iconField: "Profiles_GeoLocation.icon"
    }
  }
});

export { drilldownProfileQuery };
