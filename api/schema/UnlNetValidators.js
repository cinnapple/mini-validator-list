cube(`UnlValidators`, {
  extends: Validators,
  sql: `select * from ${Validators.sql()} where chain <> 'altnet' and unl = true`,
  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validatorssnapshot`
  }
});
