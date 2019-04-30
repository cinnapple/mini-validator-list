import * as React from "react";
import { Card, Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import Chart from "../../cubejsAdapter";
import queriesList from "./queriesList";
import { Sizes } from "../../types";
import Drawer from "../../components/Drawer";

interface Props {
  size: Sizes;
}

interface State {
  drilldownOpen: boolean;
  drilldownQuery: any;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const DashboardContainer: React.SFC<Props> = ({ size }) => {
  const [state, setState] = React.useState<State>({
    drilldownOpen: false,
    drilldownQuery: undefined
  });
  const { drilldownOpen, drilldownQuery } = state;
  return (
    <LayoutComponent size={size}>
      {queriesList.map((queryItems, i) => (
        <Row key={i} gutter={24} style={{ marginBottom: getMargin(size) }}>
          {queryItems.map(query => (
            <Col
              key={query.title}
              xs={24}
              sm={24 / queryItems.length}
              style={{
                marginBottom: size === Sizes.Mobile ? getMargin(size) : 0
              }}
            >
              <Card title={query.title}>
                <Chart
                  query={query.query}
                  type={query.type}
                  options={query.options}
                  onDrilldown={(opt: any) =>
                    query.drilldown
                      ? setState({
                          drilldownOpen: true,
                          drilldownQuery: query.drilldown(opt)
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
        onClose={() =>
          setState({ drilldownOpen: false, drilldownQuery: undefined })
        }
      >
        {drilldownOpen && (
          <Card title={drilldownQuery.title} bordered={false}>
            <Chart
              query={drilldownQuery.query}
              type={drilldownQuery.type}
              options={drilldownQuery.options}
              size={size}
            />
          </Card>
        )}
      </Drawer>
    </LayoutComponent>
  );
};

export default DashboardContainer;
