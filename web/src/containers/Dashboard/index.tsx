import * as React from "react";
import queriesList from "./queries";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import Drawer from "../../components/Drawer";
import { QueryList, IChartOptionsBase } from "../../types";

interface Props {}

interface State {
  drilldownOpen: boolean;
  drilldownQuery: QueryList<IChartOptionsBase>;
}

const DashboardContainer: React.SFC<Props> = () => {
  const [state, setState] = React.useState<State>({
    drilldownOpen: false,
    drilldownQuery: []
  });
  const { drilldownOpen, drilldownQuery } = state;
  return (
    <>
      <QueriesListRenderer
        queriesList={queriesList}
        onDrilldown={(drilldownQuery: any) =>
          setState({
            drilldownOpen: true,
            drilldownQuery
          })
        }
      />
      <Drawer
        open={drilldownOpen}
        onClose={() => setState({ drilldownOpen: false, drilldownQuery: [] })}
      >
        <QueriesListRenderer queriesList={drilldownQuery} />
      </Drawer>
    </>
  );
};

export default DashboardContainer;
