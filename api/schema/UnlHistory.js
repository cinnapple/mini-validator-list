cube(`UnlHistory`, {
  sql: `
  select distinct unl.*
  from (
        select max(unl.as_of_date) OVER (PARTITION BY date_trunc('month', (unl.as_of_date::timestamptz AT TIME ZONE 'UTC'))) as_of_date
          from unlhistory unl
       ) dates
     , unlhistory unl
 where unl.as_of_date = dates.as_of_date
 `,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM unlhistory`
  },

  joins: {
    HistoricalValidators: {
      relationship: `hasOne`,
      sql: `${UnlHistory}.validator_public_key = ${HistoricalValidators}.validation_public_key`
    },
    DomainKeyMap: {
      relationship: `hasOne`,
      sql: `${UnlHistory}.validator_public_key = ${DomainKeyMap}.validation_public_key`
    }
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
      sql: `case when COALESCE(NULLIF(${DomainKeyMap}.domain, ''), NULLIF(${HistoricalValidators}.domain, ''), 'Unknown') = 'ripple.com' then 'Ripple' else 'Non-Ripple' end`,
      type: `string`
    },

    domain: {
      sql: `COALESCE(NULLIF(${DomainKeyMap}.domain, ''), NULLIF(${HistoricalValidators}.domain, ''), 'Unknown')`,
      type: `string`
    }
  }
});
