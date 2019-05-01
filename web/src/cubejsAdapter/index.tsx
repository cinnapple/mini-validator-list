import * as React from "react";
import cubejsApi from "./cubejs";
import { QueryRenderer } from "@cubejs-client/react";
import { Spin } from "antd";
import { SupportedComponents } from "../components/Charts";
import { SupportedCharts, Sizes } from "../types";

interface Props {
  query: any;
  type: SupportedCharts;
  options: any;
  size: Sizes;
  onDrilldown?: (opt: any) => void;
}

const renderChart = (type: SupportedCharts, props: any) => {
  const Component = SupportedComponents[type] as any;
  return <Component {...props} />;
};

const Loading = () => <Spin />;

const Chart: React.SFC<Props> = ({
  query,
  type,
  size,
  options,
  onDrilldown
}) => (
  <QueryRenderer
    cubejsApi={cubejsApi}
    query={query}
    render={({ resultSet, error }: any) => {
      if (resultSet) {
        return renderChart(type, {
          resultSet,
          query,
          size,
          onDrilldown,
          options
        });
      }

      if (error) {
        console.log(error);
      }

      return <Loading />;
    }}
  />
);

export default Chart;
