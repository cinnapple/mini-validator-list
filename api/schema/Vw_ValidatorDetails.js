cube(`Vw_ValidatorDetails`, {
  sql: `select * from m_validatordetails`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM m_validatordetails`
  },

  measures: {
    count: {
      sql: `1`,
      type: `count`
    },

    verifiedCount: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `domain <> ''` }]
    },

    notVerifiedCount: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `domain = ''` }]
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

    unlSum: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `unl = true` }]
    },

    notUnlButVerifiedSum: {
      sql: `1`,
      type: `count`,
      filters: [{ sql: `unl = false and domain <> ''` }]
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
      sql: `domain`,
      type: `string`
    },

    domainOrKey: {
      sql: `COALESCE(NULLIF(domain, ''), validation_public_key)`,
      type: `string`
    },

    verified: {
      sql: `case when domain <> '' then 'Verified' else 'Unverified' end `,
      type: `string`
    },

    ripple: {
      sql: `case when domain ~ 'ripple.com' then 'Ripple' else 'Non-Ripple' end`,
      type: `string`
    },

    unl: {
      sql: `case when unl = true then 'Yes' else 'No' end `,
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

    lastUpdated: {
      sql: `last_updated`,
      type: `time`
    },

    lastUpdatedInHours: {
      sql: `EXTRACT(epoch FROM (SELECT (NOW() - last_seen))/3600)`,
      type: `number`
    },

    countryName: {
      sql: `country_name`,
      type: `string`
    },

    continentName: {
      sql: `continent_name`,
      type: `string`
    },

    latitude: {
      sql: `coalesce(latitude, 0)`,
      type: `number`
    },

    longitude: {
      sql: `coalesce(longitude, 0)`,
      type: `number`
    },

    city: {
      sql: `city`,
      type: `string`
    },

    name: {
      sql: `name`,
      type: `string`
    },

    description: {
      sql: `description`,
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

    icon: {
      sql: `icon`,
      type: `string`
    },

    scores_2_weeks: {
      sql: `scores_2_weeks`,
      type: `string`
    },

    scores_6_months: {
      sql: `scores_6_months`,
      type: `string`
    },

    hosts: {
      sql: `hosts`,
      type: `string`
    }
  }
});
