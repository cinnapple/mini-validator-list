cube(`Vw_ValidatorReportCalendar`, {
  sql: `select * from m_validatorreportcalendar`,

  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM m_validatorreportcalendar`
  },

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

    monthOfYear: {
      sql: `month_of_year`,
      type: `number`
    },

    dayOfWeek: {
      sql: `day_of_week_num`,
      type: `number`
    },

    domain: {
      sql: `domain`,
      type: `string`
    },

    chain: {
      sql: `chain`,
      type: `string`
    },

    unl: {
      sql: `unl`,
      type: `string`
    },

    stats: {
      sql: `
      chain || ';' ||
      total || ';' ||
      missed || ';' ||
      score || ';'
       `,
      type: `string`
    }
  }
});
