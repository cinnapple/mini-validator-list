import * as React from "react";
import { Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import Chart from "../../cubejsAdapter";
import queriesList from "./queriesList";
import { Sizes } from "../../types";

interface Props {
  size: Sizes;
}

interface State {}

const UnlAnalysisContainer: React.SFC<Props> = ({ size }) => {
  const [state, setState] = React.useState<State>({});
  return <LayoutComponent size={size}>Coming soon!</LayoutComponent>;
};

export default UnlAnalysisContainer;
