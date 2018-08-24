export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  };
};

export const _sort = <T>(
  list: T[],
  sortBy: string,
  sortDirection?: "asc" | "dsc"
) => {
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