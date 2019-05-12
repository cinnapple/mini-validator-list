import * as React from "react";
import { Table as _Table, Statistic, Row, Col, Card } from "antd";
import {
  Sizes,
  IStatsOptions,
  IChartPropBase,
  ITableChartOptions
} from "../../../types";
import withSize from "../../../hoc/withSize";
import { getCellRenderer } from "./CellRenderer";
import { getFilterProps } from "./filterProps";
import { getSortProps } from "./sortProps";
import { SortOrder } from "antd/lib/table";

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

const createStats = (stats: IStatsOptions[], size: Sizes) => (
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

const Table: React.SFC<IChartPropBase<ITableChartOptions<any>>> = ({
  dataSet,
  size,
  queryItem,
  onDrilldown
}) => {
  const { options } = queryItem;
  const { props, defaultFilteredInfo, buildStats } = options;
  const { columns } = props;

  const [state, setState] = React.useState({
    sortedInfo: {
      order: "ascend" as SortOrder,
      columnKey: columns[0].key as string
    },
    filteredInfo: defaultFilteredInfo || {},
    stats: buildStats && buildStats(dataSet)
  });
  const { sortedInfo, filteredInfo, stats } = state;

  const enhancedColumns = columns.map(c => {
    c.render = getCellRenderer(c, onDrilldown);
    return {
      ...c,
      ...getSortProps(c, sortedInfo),
      ...getFilterProps(c, dataSet, filteredInfo)
    };
  });

  return (
    <>
      {buildStats && createStats(stats, size)}
      <_Table
        {...props}
        bordered
        dataSource={dataSet}
        pagination={false}
        columns={enhancedColumns}
        size={size === Sizes.Mobile ? "default" : "middle"}
        onChange={(pagination, filters, sorter, extra) => {
          setState({
            sortedInfo: sorter,
            filteredInfo: filters,
            stats: buildStats && buildStats(extra.currentDataSource)
          });
        }}
      />
    </>
  );
};

export default withSize(Table);
