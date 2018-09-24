export const updateObject = <TState>(
  oldObject: TState,
  updatedValues: TState
) => {
  return <TState>{
    ...(oldObject as any),
    ...(updatedValues as any)
  };
};

export const action = <T>(type: string, data: T): Store.Action<T> => ({
  type: type,
  payload: data
});

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
