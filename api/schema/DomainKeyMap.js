cube(`DomainKeyMap`, {
  sql: `select * from domainkeymap`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM domainkeymap`
  },

  dimensions: {
    validation_public_key: {
      sql: `validation_public_key`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    domain: {
      sql: `domain`,
      type: `string`
    },

    created: {
      sql: `created`,
      type: `time`
    },

    lastUpdated: {
      sql: `last_updated`,
      type: `time`
    }
  }
});
