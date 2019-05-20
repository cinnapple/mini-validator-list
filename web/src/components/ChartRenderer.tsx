import * as React from "react";
import { SupportedCharts } from "../types";
import { SupportedComponents } from "./Charts";

interface Props {
  type: SupportedCharts;
  chartProps: any;
}

const ChartRenderer: React.SFC<Props> = ({ type, chartProps }) => {
  const Component = SupportedComponents[type] as any;
  return <Component {...chartProps} />;
};

export default ChartRenderer;
