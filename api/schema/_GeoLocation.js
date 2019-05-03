cube(`_GeoLocation`, {
  sql: `select * from geolocation`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM geolocation`
  },

  measures: {
    count: {
      sql: `1`,
      type: `count`
    },

    latitude: {
      sql: `latitude`,
      type: `number`
    },

    longitude: {
      sql: `longitude`,
      type: `number`
    }
  },

  dimensions: {
    domain: {
      sql: `domain`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    countryName: {
      sql: `country_name`,
      type: `string`
    },

    continentName: {
      sql: `continent_name`,
      type: `string`
    },

    city: {
      sql: `city`,
      type: `string`
    },

    created: {
      sql: `created`,
      type: `time`
    },

    lastUpdated: {
      sql: `lastUpdated`,
      type: `time`
    }
  }
});
