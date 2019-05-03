cube(`Validators`, {
  sql: `select * from validatorssnapshot`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validatorssnapshot`
  },

  joins: {
    DomainKeyMap: {
      relationship: `hasOne`,
      sql: `${CUBE}.validation_public_key = ${DomainKeyMap}.validation_public_key`
    }
  },

  measures: {
    count: {
      sql: `1`,
      type: `count`
    },

    verifiedCount: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `${CUBE}.domain <> ''` }]
    },

    notVerifiedCount: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `${CUBE}.domain = ''` }]
    },

    verifiedPercentage: {
      sql: `100.0 * ${verifiedCount} / ${count}`,
      type: `number`,
      format: `percent`
    },

    notVerifiedPercentage: {
      sql: `100.0 * ${notVerifiedCount} / ${count}`,
      type: `number`,
      format: `percent`
    },

    unlCount: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `${CUBE}.unl = true` }, { sql: `${CUBE}.domain <> ''` }]
    }
  },

  dimensions: {
    validation_public_key: {
      sql: `validation_public_key`,
      type: `string`,
      primaryKey: true,
      shown: true
    },

    chain: {
      sql: `chain`,
      type: `string`
    },

    domain: {
      sql: `COALESCE(NULLIF(${DomainKeyMap}.domain, ''), NULLIF(${CUBE}.domain, ''), 'Unknown')`,
      type: `string`
    },

    domainOrKey: {
      sql: `COALESCE(NULLIF(${DomainKeyMap}.domain, ''), NULLIF(${CUBE}.domain, ''), ${CUBE}.validation_public_key)`,
      type: `string`
    },

    verified: {
      sql: `case when ${CUBE}.domain <> '' then 'Verified' else 'Unverified' end `,
      type: `string`
    },

    ripple: {
      sql: `case when ${CUBE}.domain ~ 'ripple.com' then 'Ripple' else 'Non-Ripple' end`,
      type: `string`
    },

    unl: {
      sql: `case when ${CUBE}.unl = true then 'Yes' else 'No' end `,
      type: `string`
    },

    unlHost: {
      sql: `case when ${CUBE}.unl = true then 'vl.ripple.com' else 'Unknown' end `,
      type: `string`
    },

    agreement24h: {
      sql: `agreement_24h_total`,
      type: `number`
    },

    agreement24hMissed: {
      sql: `agreement_24h_missed`,
      type: `number`
    },

    agreement24hScore: {
      sql: `agreement_24h_score`,
      type: `number`
    },

    created: {
      sql: `created`,
      type: `time`
    },

    lastUpdated: {
      sql: `last_updated`,
      type: `time`
    },

    lastUpdatedInHours: {
      sql: `EXTRACT(epoch FROM (SELECT (NOW() - ${CUBE}.last_updated))/3600)`,
      type: `number`
    }
  }
});
