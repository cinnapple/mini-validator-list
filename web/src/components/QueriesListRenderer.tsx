import * as React from "react";
import { Card, Col, Row } from "antd";
import Chart from "../cubejsAdapter";
import { Sizes, IChartOptionsBase, IQueryItem, DataRow } from "../types";
import withSize, { SizeProps } from "../hoc/withSize";

interface Props extends SizeProps {
  queriesList: IQueryItem<IChartOptionsBase>[][];
  onDrilldown?: (
    selected: DataRow,
    queryItem: IQueryItem<IChartOptionsBase>
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
              <Card
                title={queryItem.title}
                headStyle={{
                  border: size === Sizes.Mobile ? "none" : undefined
                }}
                bordered={!!false}
                bodyStyle={{ padding: size === Sizes.Mobile ? 0 : 24 }}
              >
                <Chart
                  queryItem={queryItem}
                  onDrilldown={(selected: DataRow) =>
                    onDrilldown!(selected, queryItem)
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
