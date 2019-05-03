import { injectable, inject, TYPES } from "../di";
import { IStore, IConfig } from "../types";
import * as PgPromise from "pg-promise";
const pgp = PgPromise();

// timestamp without time zone
pgp.pg.types.setTypeParser(1114, stringValue => {
  return stringValue;
});

@injectable()
class PostgresStore implements IStore {
  private _db: PgPromise.IDatabase<any>;

  constructor(@inject(TYPES.Config) private _config: IConfig) {
    this._db = pgp<any>(this._config.connectionString);
  }

  private _buildColumnSet = (data: any, table: string) =>
    new pgp.helpers.ColumnSet(Object.keys(data[0]).map(key => key), { table });

  private _buildInsertQuery = (data: any, cs: PgPromise.ColumnSet) =>
    pgp.helpers.insert(data, cs);

  private _buildUpsertQuery = (
    data: any,
    cs: PgPromise.ColumnSet,
    constraintKey: string,
    skipUpdateCols: string[]
  ) =>
    this._buildInsertQuery(data, cs) +
    ` ON CONFLICT ON CONSTRAINT ${constraintKey} DO UPDATE SET ` +
    cs.assignColumns({
      from: "EXCLUDED",
      skip: skipUpdateCols
    });

  insert(table: string, data: any) {
    const cs = this._buildColumnSet(data, table);
    return this._db.none(this._buildInsertQuery(data, cs));
  }

  upsert(
    table: string,
    data: any,
    constraintKey: string,
    skipUpdateCols: string[]
  ) {
    const cs = this._buildColumnSet(data, table);
    return this._db.none(
      this._buildUpsertQuery(data, cs, constraintKey, skipUpdateCols)
    );
  }

  get<T>(stmt: string) {
    return this._db.any<T>(stmt, [true]);
  }
}

export default PostgresStore;
