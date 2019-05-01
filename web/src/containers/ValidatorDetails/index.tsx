import * as React from "react";
import { Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import Chart from "../../cubejsAdapter";
import queriesList from "./queriesList";
import { Sizes } from "../../types";

interface Props {
  size: Sizes;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const ValidatorDetailsContainer: React.SFC<Props> = ({ size }) => {
  return <LayoutComponent size={size}>Validator details</LayoutComponent>;
};

export default ValidatorDetailsContainer;
