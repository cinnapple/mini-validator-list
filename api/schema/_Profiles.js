cube(`Profiles`, {
  sql: `select * from profiles`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM profiles`
  },

  dimensions: {
    domain: {
      sql: `domain`,
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
    }
  }
});
