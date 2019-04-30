cube(`ValidatorsWithGeo`, {
  extends: Validators,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validatorssnapshot`
  },

  joins: {
    GeoLocation: {
      relationship: `hasOne`,
      sql: `${CUBE}.domain = ${GeoLocation}.domain`
    }
  },

  dimensions: {
    countryName: {
      sql: `${GeoLocation}.country_name`,
      type: `string`
    },

    continentName: {
      sql: `${GeoLocation}.continent_name`,
      type: `string`
    },

    city: {
      sql: `${GeoLocation}.city`,
      type: `string`
    }
  }
});
