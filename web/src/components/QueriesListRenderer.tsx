import * as React from "react";
import { Card, Col, Row } from "antd";
import Chart from "../cubejsAdapter";
import { QueryList, Sizes, IChartOptionsBase } from "../types";
import withSize from "../hoc/withSize";

interface Props {
  size: Sizes;
  queriesList: QueryList<IChartOptionsBase>[];
  onDrilldown?: (
    drilldownQuery: QueryList<IChartOptionsBase>[],
    selected: string
  ) => void;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const QueriesListRenderer: React.SFC<Props> = ({
  size,
  queriesList,
  onDrilldown
}) => {
  return (
    <>
      {queriesList.map((queryItems, i) => (
        <Row key={i} gutter={24} style={{ marginBottom: getMargin(size) }}>
          {queryItems.map((queryItem, i) => (
            <Col
              key={i}
              xs={24}
              sm={24 / queryItems.length}
              style={{
                marginBottom: size === Sizes.Mobile ? getMargin(size) : 0
              }}
            >
              <Card title={queryItem.title} bordered={!!queryItem.bordered}>
                <Chart
                  queryItem={queryItem}
                  onDrilldown={(selected: any) =>
                    onDrilldown!(
                      queryItem.drilldown!(selected),
                      selected.selected
                    )
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default withSize(QueriesListRenderer);
