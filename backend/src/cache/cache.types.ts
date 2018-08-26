import { HashMap } from "../types";

export namespace Memoize {
  export type MemoizedFuncParams = HashMap<string>;

  export type MemoizeOption = {
    params?: MemoizedFuncParams;
    interval?: number;
    immediate?: boolean;
  };

  export type MemoizeValue = MemoizeOption & {
    lastUpdated: Date;
    status: "pending" | "populated" | "";
    item: any;
    intervalKey?: NodeJS.Timer;
  };

  export type MemoizedItem = {
    func: (...params: any[]) => Promise<any>;
    values: HashMap<MemoizeValue>;
  };

  export interface IMemoizer {
    register: <TItem>(
      name: string,
      func: (...params: any[]) => Promise<TItem>,
      options?: Memoize.MemoizeOption
    ) => void;
    startUpdate: (name: string, params?: Memoize.MemoizedFuncParams) => void;
    get: <TItem>(
      name: string,
      params?: Memoize.MemoizedFuncParams
    ) => Promise<{ lastUpdated: Date; data: TItem }>;
  }
}
