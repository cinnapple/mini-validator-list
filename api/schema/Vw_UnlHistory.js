const rippleRegex = "'w*\\.ripple.com|^ripple\\.com'";

cube(`Vw_UnlValidatorHistory`, {
  sql: `select * from unlvalidatorhistory`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM unlvalidatorhistory`
  },

  measures: {
    count: {
      sql: `count(1)`,
      type: `number`
    }
  },

  dimensions: {
    validator_public_key: {
      sql: `validator_public_key`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    host: {
      sql: `host`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    asOfDate: {
      sql: `as_of_date`,
      type: `time`,
      primaryKey: true,
      shown: true
    },

    originalAsOfDate: {
      sql: `as_of_date`,
      type: `time`
    },

    domainCategory: {
      sql: `case when domain ~ ${rippleRegex} then 'Ripple' else 'Non-Ripple' end`,
      type: `string`
    },

    domain: {
      sql: `COALESCE(NULLIF(domain, ''), 'Unknown')`,
      type: `string`
    }
  }
});
