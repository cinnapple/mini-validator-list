import * as React from "react";
import queriesList from "./queries";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import { RouteComponentProps } from "react-router";
import cubejsClient from "../../cubejsAdapter/cubejs";

interface Props extends RouteComponentProps<{ id: string }> {}

const ValidatorDetailsContainer: React.SFC<Props> = ({ match }) => {
  const [state, setState] = React.useState({
    domain: undefined,
    validationPublicKey: match.params.id
  });
  const { domain, validationPublicKey } = state;

  React.useEffect(() => {
    const fetchData = async () => {
      const resultSet = await cubejsClient.load({
        dimensions: ["ValidatorsWithGeo.domain"],
        filters: [
          {
            dimension: "ValidatorsWithGeo.validation_public_key",
            operator: "equals",
            values: [validationPublicKey]
          }
        ]
      });
      setState({
        domain: resultSet.rawData()[0]["ValidatorsWithGeo.domain"],
        validationPublicKey
      });
    };
    fetchData();
  }, []);

  if (!domain) {
    return <div />;
  }

  return (
    <QueriesListRenderer
      queriesList={queriesList({
        selected: {
          validationPublicKey,
          domain
        }
      })}
    />
  );
};
export default ValidatorDetailsContainer;
