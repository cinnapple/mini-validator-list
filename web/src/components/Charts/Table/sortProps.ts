import { IExtendedColumnProps } from "../../../types";
import { sort } from "../../../helpers/util";
import { SortOrder } from "antd/lib/table";

const getSortProps = (
  c: IExtendedColumnProps<any>,
  sortedInfo: {
    order: SortOrder;
    columnKey: string;
  }
) => {
  const sorter = (a: any, b: any) => sort(a[c.dataIndex!], b[c.dataIndex!]);
  const sortOrder = sortedInfo.columnKey === c.key && sortedInfo.order;
  return {
    sorter,
    sortOrder
  };
};

export { getSortProps };
