cube(`GeoLocation`, {
  sql: `select * from geolocation`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM geolocation`
  },

  joins: {
    MainNetValidators: {
      relationship: `hasOne`,
      sql: `${MainNetValidators}.domain = ${GeoLocation}.domain`
    }
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
    },

    unlSum: {
      sql: `case when ${MainNetValidators}.unl = true then 1 else 0 end `,
      type: `sum`
    },

    notUnlButVerifiedSum: {
      sql: `case when ${MainNetValidators}.unl = false and ${MainNetValidators}.domain <> '' then 1 else 0 end`,
      type: `sum`
    },

    altNetChainSum: {
      sql: `case when ${MainNetValidators}.chain = 'altnet' then 1 else 0 end `,
      type: `sum`
    },

    validatorCount: {
      sql: ``,
      type: `count`
    }
  },

  dimensions: {
    validation_public_key: {
      sql: `${MainNetValidators}.validation_public_key`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

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
