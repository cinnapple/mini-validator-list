import * as React from "react";
import cubejsApi from "./cubejs";
import { QueryRenderer } from "@cubejs-client/react";
import { Spin } from "antd";
import { SupportedComponents } from "../components/Charts";
import {
  SupportedCharts,
  Sizes,
  IQueryItem,
  SupportedPivotTypes,
  ICubePivotConfig
} from "../types";

interface Props {
  size: Sizes;
  queryItem: IQueryItem<any>;
  onDrilldown?: (opt: any) => void;
}

const renderChart = (type: SupportedCharts, props: any) => {
  const Component = SupportedComponents[type] as any;
  return <Component {...props} />;
};

const Loading = () => <Spin />;

const pivot = (
  resultSet: any,
  type?: SupportedPivotTypes,
  config?: ICubePivotConfig
) => {
  if (type === "chart") {
    return resultSet.chartPivot(config);
  }
  if (type === "table") {
    return resultSet.tablePivot(config);
  }
  return resultSet.rawData();
};

const Chart: React.SFC<Props> = ({ queryItem, size, onDrilldown }) => (
  <QueryRenderer
    cubejsApi={cubejsApi}
    query={queryItem.query}
    render={({ resultSet, error }: any) => {
      if (resultSet) {
        const dataSet = pivot(
          resultSet,
          queryItem.pivotType,
          queryItem.pivotConfig
        );
        return renderChart(queryItem.type, {
          dataSet,
          size,
          onDrilldown,
          queryItem
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
