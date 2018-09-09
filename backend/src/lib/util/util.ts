function _first<T>(
  items: T[],
  predicate: (item: T) => boolean,
  defaultItem: T = undefined
) {
  const filtered = items.filter(predicate);
  if (filtered && Array.isArray(filtered) && filtered.length > 0) {
    return filtered[0];
  } else {
    return defaultItem;
  }
}

const _union = (listA: string[], listB: string[]) => {
  const dict = {};
  const add = (d, v) => {
    if (v && !d[v]) {
      d[v] = true;
    }
  };
  listA.forEach(a => add(dict, a));
  listB.forEach(b => add(dict, b));
  return Object.keys(dict);
};

const _sort = <T>(list: T[], sortBy: string, sortDirection?: "asc" | "dsc") => {
  list.sort((a, b) => {
    let rtnVal = 0;
    if (a[sortBy] > b[sortBy]) {
      rtnVal = 1;
    } else if (a[sortBy] < b[sortBy]) {
      rtnVal = -1;
    } else {
      rtnVal = 0;
    }
    return rtnVal * (sortDirection === "dsc" ? -1 : 1);
  });
};

const _groupByWithCount = (list: any[], groupBy: string) => {
  const groupByCount = list.reduce((p, c) => {
    if (!p[c[groupBy]]) {
      p[c[groupBy]] = 1;
    } else {
      p[c[groupBy]]++;
    }
    return p;
  }, {});
  const newList = Object.keys(groupByCount).map(d => ({
    [groupBy]: d,
    count: groupByCount[d]
  }));
  return newList;
};

const _getMaxMin = (data: any, by: string) => {
  const high = data.reduce((p, c) => (p >= c[by] ? p : c[by]), undefined);
  const low = data.reduce((p, c) => (p <= c[by] ? p : c[by]), undefined);
  return {
    max: high,
    min: low
  };
};

const _addRate = (data: any[], by: string) => {
  let countGroup = _groupByWithCount(
    data.map(v => ({ ...v, _count: v[by] })),
    "_count"
  ).map(a => ({ ...a, _count: parseInt(a["_count"]) }));
  _sort(countGroup, "_count", "dsc");
  data = data.map(e => {
    const d = countGroup.findIndex(c => c._count === e[by]);
    return {
      ...e,
      rate: d / countGroup.length
    };
  });
  return data;
};

const DATED_CACHE = (cacheName: string, date: string) => {
  return `${cacheName}${date ? `.${date}` : ""}`;
};

export {
  _first,
  _union,
  _sort,
  _groupByWithCount,
  _getMaxMin,
  _addRate,
  DATED_CACHE
};
