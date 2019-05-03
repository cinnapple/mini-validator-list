import {
  IQueryItem,
  IProfileChartOptions,
  ISelectedValue,
  SupportedCharts
} from "../../../types";

const drilldownProfileQuery = (
  opt: ISelectedValue
): IQueryItem<IProfileChartOptions> => ({
  title: `Operator`,
  type: SupportedCharts.DomainProfile,
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
        values: [opt.selected["ValidatorsWithGeo.domain"]]
      }
    ]
  },
  options: {
    props: {}
  }
});

export { drilldownProfileQuery };
