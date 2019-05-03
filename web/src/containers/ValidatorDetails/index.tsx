import * as React from "react";
import { Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import Chart from "../../cubejsAdapter";
import queriesList from "./queriesList";
import { Sizes } from "../../types";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{ id: string }> {
  size: Sizes;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const ValidatorDetailsContainer: React.SFC<Props> = ({ size, match }) => {
  return (
    <LayoutComponent size={size}>
      Validator details {match.params.id}
    </LayoutComponent>
  );
};

export default ValidatorDetailsContainer;
