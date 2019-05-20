import * as React from "react";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import Drawer from "../../components/Drawer";
import { RouteComponentProps, Redirect } from "react-router";
import { DataRow, IQueryItem, IChartOptionsBase } from "../../types";
import { isEmpty } from "../../helpers/util";
import { verifiedValidatorQuery } from "./queries/verifiedValidatorsQuery";
import { defaultUnlDominanceQuery } from "./queries/defaultUnlDominanceQuery";
import { defaultUnlDominanceMovementQuery } from "./queries/defaultUnlDominanceMovementQuery";
import { unlOperatorMapQuery } from "./queries/domainMapQuery";
import { areaBreakdownQuery } from "./queries/areaBreakdownQuery";

interface Params {
  selected: string;
  type: string;
}

interface Props extends RouteComponentProps<Params> {}

const DashboardContainer: React.SFC<Props> = ({ history, match }) => {
  const [state, setState] = React.useState({
    drilldownQuery: undefined
  });
  const { drilldownQuery } = state;
  const { hash } = history.location;
  if (!isEmpty(hash) && !drilldownQuery) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <QueriesListRenderer
        queriesList={[
          [verifiedValidatorQuery, defaultUnlDominanceQuery],
          [defaultUnlDominanceMovementQuery],
          [unlOperatorMapQuery],
          [areaBreakdownQuery]
        ]}
        onDrilldown={(
          selected: DataRow,
          queryItem: IQueryItem<IChartOptionsBase>
        ) => {
          setState({
            drilldownQuery: queryItem.drilldown!(selected) as any
          });
          history.push(`/#drilldown`);
        }}
      />
      <Drawer open={!isEmpty(hash)} onClose={() => history.goBack()}>
        {!isEmpty(hash) && <QueriesListRenderer queriesList={drilldownQuery} />}
      </Drawer>
    </>
  );
};

export default DashboardContainer;
