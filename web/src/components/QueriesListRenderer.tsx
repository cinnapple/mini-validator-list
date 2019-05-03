import * as React from "react";
import { Card, Col, Row } from "antd";
import Chart from "../cubejsAdapter";
import Drawer from "./Drawer";
import { QueryList, Sizes, IChartOptionsBase } from "../types";

interface Props {
  size: Sizes;
  queriesList: QueryList<IChartOptionsBase>[];
}

interface State {
  drilldownOpen: boolean;
  drilldownQuery: QueryList<IChartOptionsBase>;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const QueriesListRenderer: React.SFC<Props> = ({ size, queriesList }) => {
  const [state, setState] = React.useState<State>({
    drilldownOpen: false,
    drilldownQuery: []
  });
  const { drilldownOpen, drilldownQuery } = state;
  return (
    <>
      {queriesList.map((queryItems, i) => (
        <Row key={i} gutter={24} style={{ marginBottom: getMargin(size) }}>
          {queryItems.map(queryItem => (
            <Col
              key={queryItem.title}
              xs={24}
              sm={24 / queryItems.length}
              style={{
                marginBottom: size === Sizes.Mobile ? getMargin(size) : 0
              }}
            >
              <Card
                title={queryItem.title}
                bordered={
                  queryItem.bordered !== undefined ? queryItem.bordered : true
                }
              >
                <Chart
                  query={queryItem.query}
                  type={queryItem.type}
                  chartTransformOption={queryItem.chartTransformOption}
                  options={queryItem.options}
                  onDrilldown={(opt: any) =>
                    queryItem.drilldown
                      ? setState({
                          drilldownOpen: true,
                          drilldownQuery: queryItem.drilldown(opt)
                        })
                      : undefined
                  }
                  size={size}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ))}
      <Drawer
        open={state.drilldownOpen}
        size={size}
        onClose={() => setState({ drilldownOpen: false, drilldownQuery: [] })}
      >
        {drilldownOpen &&
          drilldownQuery.map((queryItem, i) => (
            <Row key={i} gutter={24}>
              <Col
                xs={24}
                style={{
                  marginBottom: size === Sizes.Mobile ? getMargin(size) : 0
                }}
              >
                <Card title={queryItem.title} bordered={false}>
                  <Chart
                    query={queryItem.query}
                    type={queryItem.type}
                    chartTransformOption={queryItem.chartTransformOption}
                    options={queryItem.options}
                    size={size}
                  />
                </Card>
              </Col>
            </Row>
          ))}
      </Drawer>
    </>
  );
};

export default QueriesListRenderer;
