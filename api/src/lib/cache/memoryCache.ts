import "reflect-metadata";

export default class InMemoryCache {
  private _obj: lib.HashMap<any>;
  constructor() {
    this._obj = {};
  }

  get = <TItem>(name: string) => {
    return <TItem>this._obj[name];
  };

  set = (name: string, value: any) => {
    if (this.get(name)) {
      this.del(name);
    }
    return (this._obj[name] = value);
  };

  del = (name: string) => {
    delete this._obj[name];
  };

  keys = () => {
    return Object.keys(this._obj);
  };
}
