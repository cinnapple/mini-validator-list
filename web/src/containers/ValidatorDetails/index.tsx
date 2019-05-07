import * as React from "react";
import LayoutComponent from "../../components/LayoutComponent";
import queriesList from "./queries";
import { Sizes } from "../../types";
import QueriesListRenderer from "../../components/QueriesListRenderer";
import { RouteComponentProps } from "react-router";
import cubejsClient from "../../cubejsAdapter/cubejs";

interface Props extends RouteComponentProps<{ id: string }> {
  size: Sizes;
}

const ValidatorDetailsContainer: React.SFC<Props> = ({ size, match }) => {
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
    <LayoutComponent size={size}>
      <QueriesListRenderer
        size={size}
        queriesList={queriesList({
          selected: {
            validationPublicKey,
            domain
          }
        })}
      />
    </LayoutComponent>
  );
};
export default ValidatorDetailsContainer;
