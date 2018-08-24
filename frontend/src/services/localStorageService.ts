import { AppData } from "../types";

const KEYS = {
  APP: "APP"
};

const SCHEMA = {
  APP: {
    themeType: "",
    lang: ""
  }
};

class LocalStorageRepository {
  constructor(private _key: string) {}

  get = () => {
    let data: AppData;
    try {
      data = JSON.parse(localStorage.getItem(this._key));
    } catch {}
    if (!data) {
      data = { ...SCHEMA[this._key] };
    }
    return data;
  };

  set = (props: any) => {
    const _data = this.get();
    const newData = {
      ..._data,
      ...props
    };
    localStorage.setItem(this._key, JSON.stringify(newData));
  };
}

class LocalStorageService {
  private _with = (repositoryType: string) => {
    return new LocalStorageRepository(repositoryType);
  };

  getAppData = () => this._with(KEYS.APP).get();

  setAppData = (props: { [key: string]: any }) =>
    this._with(KEYS.APP).set(props);
}

const localStorageService = new LocalStorageService();

export { localStorageService };
