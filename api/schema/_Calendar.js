cube(`Calendar`, {
  sql: `select * from calendar`,

  measures: {},

  dimensions: {
    date: {
      sql: `cal_date`,
      type: `time`,
      primaryKey: true,
      shown: true
    },

    daysToEndOfMonth: {
      sql: `days_to_end_of_month`,
      type: `number`
    },

    monthOfYear: {
      sql: `month_of_year`,
      type: `number`
    },

    dayOfWeek: {
      sql: `day_of_week_num`,
      type: `number`
    },

    week: {
      sql: `week_of_year`,
      type: `number`
    }
  }
});
