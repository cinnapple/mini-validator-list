cube(`MainNetValidators`, {
  extends: Validators,
  sql: `select * from ${Validators.sql()} where chain <> 'altnet'`,
  refreshKey: {
    sql: `SELECT MAX(last_updated) FROM validatorssnapshot`
  }
});
