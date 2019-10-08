import * as React from "react";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import { RouteComponentProps } from "react-router";
import Drawer from "../../components/Drawer";
import { validatorsListQuery } from "./queries/validatorsListQuery";
import { DataRow } from "../../types";

interface Params {
  pubkey: string;
}

interface Props extends RouteComponentProps<Params> {}

const getDrilldownQuery = (params: Params) => {
  const drilldownQuery = validatorsListQuery.drilldown!({
    "Vw_ValidatorDetails.validation_public_key": params.pubkey
  });

  return drilldownQuery;
};

const ValidatorListContainer: React.SFC<Props> = ({ history, match }) => {
  return (
    <>
      <QueriesListRenderer
        queriesList={[[validatorsListQuery]]}
        onDrilldown={(selected: DataRow) =>
          history.push(
            `/validators/${selected["Vw_ValidatorDetails.validation_public_key"]}`
          )
        }
      />
      <Drawer
        open={!!match.params.pubkey}
        onClose={() => history.push(`/validators`)}
      >
        {!!match.params.pubkey && (
          <QueriesListRenderer queriesList={getDrilldownQuery(match.params)} />
        )}
      </Drawer>
    </>
  );
};
export default ValidatorListContainer;
