cube(`HistoricalValidators`, {
  extends: Validators,
  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validatorssnapshot`
  }
});
