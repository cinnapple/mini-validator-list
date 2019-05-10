import * as React from "react";
import queriesList from "./queries";
import QueriesListRenderer from "../../components/QueriesListRenderer";

interface Props {}

const UNLScoreboardContainer: React.SFC<Props> = () => (
  <QueriesListRenderer queriesList={queriesList} />
);
export default UNLScoreboardContainer;
