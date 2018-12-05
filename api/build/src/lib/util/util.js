"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _first(items, predicate, defaultItem = undefined) {
    const filtered = items.filter(predicate);
    if (filtered && Array.isArray(filtered) && filtered.length > 0) {
        return filtered[0];
    }
    else {
        return defaultItem;
    }
}
exports._first = _first;
const _union = (listA, listB) => {
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
exports._union = _union;
const _sort = (list, sortBy, sortDirection) => {
    list.sort((a, b) => {
        let rtnVal = 0;
        if (a[sortBy] > b[sortBy]) {
            rtnVal = 1;
        }
        else if (a[sortBy] < b[sortBy]) {
            rtnVal = -1;
        }
        else {
            rtnVal = 0;
        }
        return rtnVal * (sortDirection === "dsc" ? -1 : 1);
    });
};
exports._sort = _sort;
const _groupByWithCount = (list, groupBy) => {
    const groupByCount = list.reduce((p, c) => {
        if (!p[c[groupBy]]) {
            p[c[groupBy]] = 1;
        }
        else {
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
exports._groupByWithCount = _groupByWithCount;
const _getMaxMin = (data, by) => {
    const high = data.reduce((p, c) => (p >= c[by] ? p : c[by]), undefined);
    const low = data.reduce((p, c) => (p <= c[by] ? p : c[by]), undefined);
    return {
        max: high,
        min: low
    };
};
exports._getMaxMin = _getMaxMin;
const _addRate = (data, by) => {
    let countGroup = _groupByWithCount(data.map(v => (Object.assign({}, v, { _count: v[by] }))), "_count").map(a => (Object.assign({}, a, { _count: parseInt(a["_count"]) })));
    _sort(countGroup, "_count", "dsc");
    data = data.map(e => {
        const d = countGroup.findIndex(c => c._count === e[by]);
        return Object.assign({}, e, { rate: d / countGroup.length });
    });
    return data;
};
exports._addRate = _addRate;
const DATED_CACHE = (cacheName, date) => {
    return `${cacheName}${date ? `.${date}` : ""}`;
};
exports.DATED_CACHE = DATED_CACHE;
//# sourceMappingURL=util.js.map