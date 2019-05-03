import * as React from "react";
import LayoutComponent from "../../components/LayoutComponent";
import queriesList from "./queries";
import { Sizes } from "../../types";
import QueriesListRenderer from "../../components/QueriesListRenderer";

interface Props {
  size: Sizes;
}

const ValidatorListContainer: React.SFC<Props> = ({ size }) => (
  <LayoutComponent size={size}>
    <QueriesListRenderer size={size} queriesList={queriesList} />
  </LayoutComponent>
);
export default ValidatorListContainer;
