import * as React from "react";
import cubejsClient from "../../cubejsAdapter/cubejs";
import Scoreboard from "../../components/Charts/Scoreboard";
import { scoreboardQuery } from "./queries/scoreboardQuery";

interface Props {}

const UNLScoreboardContainer: React.SFC<Props> = () => {
  const [state, setState] = React.useState({
    validators: [],
    scores: []
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const validators = await cubejsClient.load({
        dimensions: [
          "Vw_ValidatorDetails.domain",
          "Vw_ValidatorDetails.chain",
          "Vw_ValidatorDetails.icon",
          "Vw_ValidatorDetails.validation_public_key"
        ],
        filters: [
          {
            dimension: "Vw_ValidatorDetails.unl",
            operator: "equals",
            values: ["Yes"]
          },
          {
            dimension: "Vw_ValidatorDetails.chain",
            operator: "notEquals",
            values: ["altnet"]
          }
        ]
      });
      const scores = await cubejsClient.load(scoreboardQuery.query);
      setState({
        validators: validators.rawData(),
        scores: scores.rawData()
      });
    };
    fetchData();
  }, []);

  const { scores, validators } = state;
  if (!scores || !validators) {
    return <div />;
  }

  return <Scoreboard dataSet={state} queryItem={scoreboardQuery} />;
};
export default UNLScoreboardContainer;
