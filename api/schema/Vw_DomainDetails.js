cube(`Vw_DomainDetails`, {
  sql: `select * from domaindetails`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM domaindetails`
  },

  dimensions: {
    domain: {
      sql: `domain`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    city: {
      sql: `city`,
      type: `string`
    },

    continent_name: {
      sql: `continent_name`,
      type: `string`
    },

    country_code: {
      sql: `country_code`,
      type: `string`
    },

    country_name: {
      sql: `country_name`,
      type: `string`
    },

    latitude: {
      sql: `latitude`,
      type: `number`
    },

    longitude: {
      sql: `longitude`,
      type: `number`
    },

    name: {
      sql: `name`,
      type: `string`
    },

    twitter: {
      sql: `twitter`,
      type: `string`
    },

    web: {
      sql: `web`,
      type: `string`
    },

    description: {
      sql: `description`,
      type: `string`
    },

    icon: {
      sql: `icon`,
      type: `string`
    },

    last_updated: {
      sql: `last_updated`,
      type: `time`
    },

    validator_count: {
      sql: `validator_count`,
      type: `number`
    },

    validators: {
      sql: `validators`,
      type: `string`
    },

    unl_count: {
      sql: `unl_count`,
      type: `number`
    },

    main_chain_count: {
      sql: `main_chain_count`,
      type: `number`
    },

    altnet_chain_count: {
      sql: `altnet_chain_count`,
      type: `number`
    }
  }
});
