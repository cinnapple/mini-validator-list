import * as React from "react";
import { Table as _Table, Statistic, Row, Col, Card } from "antd";
import { IChartPropBase, Sizes } from "../../types";
import { ColumnProps } from "antd/lib/table";
import { uniq, sortBy, sort } from "../../helpers/util";

export interface ExtendedColumnProps extends ColumnProps<any> {
  enableFilter: boolean;
  type: "shortdate" | "key";
  format: string;
}

export interface ITableStats {
  title: string;
  value: string;
  suffix: string;
}

export interface ITableChartProps extends IChartPropBase {
  columns: ExtendedColumnProps[];
  defaultFilteredInfo: any;
  scroll: any;
  showHeader: boolean;
  buildStats: (data: any[]) => ITableStats[];
  rowKey: string;
}

const isLastOddIndex = (total: number, i: number) => {
  return total % 2 === 1 && i === total - 1;
};

const getColSpan = (size: Sizes, totalItems: number, currentItem: number) => {
  return size === Sizes.Mobile
    ? isLastOddIndex(totalItems, currentItem)
      ? 24
      : 12
    : 24 / totalItems;
};

const createStats = (stats: ITableStats[], size: Sizes) => (
  <Row gutter={16}>
    {stats.map((s, i) => (
      <Col key={s.title} span={getColSpan(size, stats.length, i)}>
        <Card
          style={{ marginBottom: size === Sizes.Mobile ? 12 : 24 }}
          bordered={true}
        >
          <Statistic title={s.title} value={s.value} suffix={s.suffix} />
        </Card>
      </Col>
    ))}
  </Row>
);

const getFormatter = (c: ExtendedColumnProps) => {
  if (c.type === "key") {
    return (text: string) => {
      return `${text.substr(0, 10)}...`;
    };
  }
  if (c.type === "shortdate") {
    return (relativeHours: number) => {
      if (relativeHours >= 24) {
        return `${(relativeHours / 24).toFixed(0)} days ago`;
      }
      if (relativeHours >= 1) {
        return `${relativeHours.toFixed(0)} hours ago`;
      }
      return "Just now";
    };
  }
};

const Table: React.SFC<ITableChartProps> = ({
  resultSet,
  defaultFilteredInfo,
  columns,
  size,
  scroll,
  showHeader,
  buildStats,
  rowKey
}) => {
  const data = resultSet.rawData();
  const [state, setState] = React.useState({
    sortedInfo: {
      order: "ascend" as ("descend" | "ascend"),
      columnKey: columns[0].key
    },
    filteredInfo: defaultFilteredInfo || {},
    stats: buildStats && buildStats(data)
  });
  const { sortedInfo, filteredInfo, stats } = state;

  const enhancedColumns = columns.map(c => {
    const key = (c.key as any) as string;
    const idx = c.dataIndex as string;
    const sortProps = {
      sorter: (a: any, b: any) => sort(a[idx], b[idx]),
      sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : undefined
    };
    let filterProps = {};
    if (c.enableFilter) {
      const filterValues = sortBy(uniq(data.map((a: any) => a[key])));
      filterProps = {
        filters: filterValues.map(a => ({ text: a, value: a })),
        filteredValue: filteredInfo[key] || (null as any),
        onFilter: (value: string, record: any) => {
          return record[key] === value;
        }
      };
    }
    c.render = getFormatter(c);
    return {
      ...c,
      ...sortProps,
      ...filterProps
    };
  });

  return (
    <>
      {buildStats && createStats(stats, size)}
      <_Table
        showHeader={showHeader}
        rowKey={rowKey}
        dataSource={data}
        pagination={false}
        columns={enhancedColumns}
        bordered
        size={size === Sizes.Mobile ? "default" : "middle"}
        onChange={(pagination, filters, sorter, extra) => {
          setState({
            sortedInfo: sorter,
            filteredInfo: filters,
            stats: buildStats && buildStats(extra.currentDataSource)
          });
        }}
        scroll={scroll}
      />
    </>
  );
};

export default Table;
