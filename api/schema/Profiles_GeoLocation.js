cube(`Profiles_GeoLocation`, {
  extends: Profiles,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM profiles`
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
