import { IExtendedColumnProps } from "../../../types";
import {
  sortBy,
  uniq,
  flat,
  nullIf,
  parseUnlHost
} from "../../../helpers/util";

const unlsFilterProps = (
  c: IExtendedColumnProps<any>,
  dataSet: any[],
  filteredInfo: { [key: string]: string }
) => {
  const filters = sortBy(
    uniq(flat(dataSet.map((a: any) => nullIf(a[c.key!], "").split(";"))))
  ).map(a => ({
    text: parseUnlHost(a),
    value: a
  }));
  const filteredValue = filteredInfo[c.key!] || (null as any);
  const onFilter = (value: string, record: any) => {
    return nullIf(record[c.key!], "").includes(value);
  };
  return {
    filters,
    filteredValue,
    onFilter
  };
};

const defaultFilterProps = (
  c: IExtendedColumnProps<any>,
  dataSet: any[],
  filteredInfo: { [key: string]: string }
) => {
  const filters = sortBy(uniq(dataSet.map((a: any) => a[c.key!]))).map(a => ({
    text: a,
    value: a
  }));
  const filteredValue = filteredInfo[c.key!] || (null as any);
  const onFilter = (value: string, record: any) => {
    return record[c.key!] === value;
  };
  return {
    filters,
    filteredValue,
    onFilter
  };
};

const getFilterProps = (
  c: IExtendedColumnProps<any>,
  dataSet: any[],
  filteredInfo: { [key: string]: string }
) => {
  if (!c.enableFilter) {
    return {};
  }

  if (c.type === "unls") {
    return unlsFilterProps(c, dataSet, filteredInfo);
  }

  return defaultFilterProps(c, dataSet, filteredInfo);
};

export { getFilterProps };
