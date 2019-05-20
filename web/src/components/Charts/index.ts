import { SupportedCharts } from "../../types";

import Donut from "./Donut";
import StackedBar from "./StackedBar";
import HorizontalStackedBar from "./HorizontalStackedBar";
import Table from "./Table/Table";
import WorldMap from "./WorldMap";
import DomainProfile from "./DomainProfile";
import ValidationScore from "./ValidationScore";
import Scoreboard from "../ChartContainers/ScoreboardContainer";
import ValidatorProfile from "../ChartContainers/ValidatorProfileContainer";

export const SupportedComponents = {
  [SupportedCharts.Donut]: Donut,
  [SupportedCharts.StackedBar]: StackedBar,
  [SupportedCharts.HorizontalStackedBar]: HorizontalStackedBar,
  [SupportedCharts.Table]: Table,
  [SupportedCharts.Map]: WorldMap,
  [SupportedCharts.DomainProfile]: DomainProfile,
  [SupportedCharts.ValidationScore]: ValidationScore,
  [SupportedCharts.Scoreboard]: Scoreboard,
  [SupportedCharts.ValidatorProfile]: ValidatorProfile
};
