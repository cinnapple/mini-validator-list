import { SupportedCharts } from "../../types";

import Donut from "./Donut";
import StackedBar from "./StackedBar";
import HorizontalStackedBar from "./HorizontalStackedBar";
import Table from "./Table";
import WorldMap from "./WorldMap";

export const SupportedComponents = {
  [SupportedCharts.Donut]: Donut,
  [SupportedCharts.StackedBar]: StackedBar,
  [SupportedCharts.HorizontalStackedBar]: HorizontalStackedBar,
  [SupportedCharts.Table]: Table,
  [SupportedCharts.Map]: WorldMap
};
