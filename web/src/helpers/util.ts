const uniq = (arry: any[] = []) => {
  return Array.from(new Set<string>(arry.map(x => x).filter(x => x)).values());
};

const sort = (a: string | number, b: string | number) => {
  if (typeof a === "string" && typeof b === "string") {
    const _a = a.toLocaleLowerCase();
    const _b = b.toLocaleLowerCase();
    return _a > _b ? 1 : _b > _a ? -1 : 0;
  }
  return a > b ? 1 : b > a ? -1 : 0;
};

const _sortBy = (key?: string) => {
  return (a: any, b: any) => (key ? sort(a[key], b[key]) : sort(a, b));
};

const sortBy = (array: any[] = [], key?: string) => {
  return array.concat().sort(_sortBy(key));
};

const isEmpty = (obj: any) => {
  return (
    obj === "" ||
    obj === null ||
    obj === undefined ||
    Object.keys(obj).length === 0
  );
};

const insertIf = (cond: boolean, itemIfTrue: any, itemIfFalse?: any) =>
  cond ? itemIfTrue : itemIfFalse || (Array.isArray(itemIfTrue) ? [] : {});

export { uniq, sort, sortBy, isEmpty, insertIf };
