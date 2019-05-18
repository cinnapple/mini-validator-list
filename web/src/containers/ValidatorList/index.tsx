import * as React from "react";
import queriesList from "./queries";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import { RouteComponentProps } from "react-router";
import Drawer from "../../components/Drawer";
import { QueryList, IChartOptionsBase } from "../../types";

interface Props extends RouteComponentProps<{ pubkey: string }> {}

interface State {
  drilldownOpen: boolean;
  drilldownQuery: QueryList<IChartOptionsBase>[];
}

const ValidatorListContainer: React.SFC<Props> = ({ history, match }) => {
  const [state, setState] = React.useState<State>({
    drilldownOpen: false,
    drilldownQuery: []
  });
  const { drilldownOpen, drilldownQuery } = state;

  return (
    <>
      <QueriesListRenderer
        queriesList={queriesList}
        onDrilldown={(drilldownQuery: QueryList<IChartOptionsBase>[]) => {
          setState({
            drilldownOpen: true,
            drilldownQuery
          });
        }}
      />
      <Drawer
        open={drilldownOpen}
        onClose={() => {
          setState({ drilldownOpen: false, drilldownQuery: [] });
        }}
      >
        <QueriesListRenderer queriesList={drilldownQuery} />
      </Drawer>
    </>
  );
};
export default ValidatorListContainer;
