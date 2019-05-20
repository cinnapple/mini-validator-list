import * as React from "react";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import { scoreboardQuery } from "./queries/scoreboardQuery";

interface Props {}

const UNLScoreboardContainer: React.SFC<Props> = () => {
  return <QueriesListRenderer queriesList={[[scoreboardQuery]]} />;
};

export default UNLScoreboardContainer;
