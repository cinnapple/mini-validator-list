import * as React from "react";
import { Table as _Table, Statistic, Row, Col, Card, Icon, Badge } from "antd";
import {
  Sizes,
  IStatsOptions,
  IExtendedColumnProps,
  IChartPropBase,
  ITableChartOptions
} from "../../types";
import { uniq, sortBy, sort } from "../../helpers/util";
import withSize from "../../hoc/withSize";

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

const getStaus = (relativeHours: number) => {
  if (relativeHours >= 24) {
    return <Badge status="error" />;
  } else if (relativeHours >= 1) {
    return <Badge status="warning" />;
  }
  return <Badge status="processing" color="#1DA57A" />;
};

const renderer = (
  c: IExtendedColumnProps<any>,
  onDrilldown?: (opt: any) => void
) => {
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
  if (c.type === "score") {
    return (score: number) => {
      return score.toFixed(4);
    };
  }
  if (c.type === "domain") {
    return (domain: string, rec: any) => (
      <>
        {getStaus(rec[c.domainRenderOptions!.relativeHoursField])}
        {onDrilldown ? (
          <a
            onClick={() =>
              c.domainRenderOptions ? onDrilldown({ selected: rec }) : undefined
            }
          >
            {domain !== "Unknown" ? (
              domain
            ) : c.domainRenderOptions ? (
              <code style={{ fontSize: "smaller" }}>
                {rec[c.domainRenderOptions.textField]}
              </code>
            ) : (
              ""
            )}
          </a>
        ) : (
          domain
        )}
      </>
    );
  }
};

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
      order: "ascend" as ("descend" | "ascend"),
      columnKey: columns[0].key
    },
    filteredInfo: defaultFilteredInfo || {},
    stats: buildStats && buildStats(dataSet)
  });
  const { sortedInfo, filteredInfo, stats } = state;

  const enhancedColumns = columns.map(c => {
    const key = (c.key as any) as string;
    const idx = c.dataIndex as string;
    // sorter
    const sortProps = {
      sorter: (a: any, b: any) => sort(a[idx], b[idx]),
      sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : undefined
    };
    // filter
    let filterProps = {};
    if (c.enableFilter) {
      const filterValues = sortBy(uniq(dataSet.map((a: any) => a[key])));
      filterProps = {
        filters: filterValues.map(a => ({ text: a, value: a })),
        filteredValue: filteredInfo[key] || (null as any),
        onFilter: (value: string, record: any) => {
          return record[key] === value;
        }
      };
    }
    // render
    c.render = renderer(c, onDrilldown);

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
