import * as React from "react";
import cubejsApi from "./cubejs";
import { QueryRenderer } from "@cubejs-client/react";
import { Spin } from "antd";
import { SupportedComponents } from "../components/Charts";
import {
  SupportedCharts,
  Sizes,
  SupportedChartTransformOptions
} from "../types";

interface Props {
  query: any;
  type: SupportedCharts;
  chartTransformOption?: SupportedChartTransformOptions;
  options: any;
  size: Sizes;
  onDrilldown?: (opt: any) => void;
}

const renderChart = (type: SupportedCharts, props: any) => {
  const Component = SupportedComponents[type] as any;
  return <Component {...props} />;
};

const Loading = () => <Spin />;

const transformDataSet = (
  resultSet: any,
  type?: SupportedChartTransformOptions
) => {
  if (type === "chartPivot") {
    return resultSet.chartPivot();
  }
  return resultSet.rawData();
};

const Chart: React.SFC<Props> = ({
  query,
  type,
  chartTransformOption,
  size,
  options,
  onDrilldown
}) => (
  <QueryRenderer
    cubejsApi={cubejsApi}
    query={query}
    render={({ resultSet, error }: any) => {
      if (resultSet) {
        const dataSet = transformDataSet(resultSet, chartTransformOption);
        return renderChart(type, {
          dataSet,
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
