cube(`ValidationReports`, {
  sql: `select * from validationreport`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validationreport`
  },

  measures: {},

  dimensions: {
    validation_public_key: {
      sql: `validation_public_key`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    date: {
      sql: `date`,
      type: `time`,
      primaryKey: true,
      shown: true
    },

    chain: {
      sql: `chain`,
      type: `string`
    },

    total: {
      sql: `total`,
      type: `number`
    },

    missed: {
      sql: `missed`,
      type: `number`
    },

    score: {
      sql: `score`,
      type: `number`
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
