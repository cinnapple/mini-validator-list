import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import axios from "../../util/axios-api";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import CardLayout from "../../hoc/Layout/CardLayout";
import CardLayoutItem from "../../hoc/Layout/CardLayoutItem";

import ValidatorOverviewCard from "../../components/Cards/ValidatorOverviewCard/ValidatorOverviewCard";
import DefaultUnlOverviewCard from "../../components/Cards/DefaultUnlOverviewCard/DefaultUnlOverviewCard";
import CountryOverviewCard from "../../components/Cards/CountryOverviewCard/CountryOverviewCard";

const SIZE_XS = 3;
const SIZE_SM = 6;
const SIZE_MD = 9;
const SIZE_LG = 12;

class OverviewContainer extends React.Component {
  componentDidMount() {
    this.props.onInitSummary();
  }

  render() {
    const { sum, isLoading } = this.props;
    const { summary } = sum;

    return (
      <CardLayout>
        <CardLayoutItem isTop={true} sm={SIZE_SM}>
          <ValidatorOverviewCard summary={summary} isLoading={isLoading} />
        </CardLayoutItem>
        <CardLayoutItem sm={SIZE_SM}>
          <DefaultUnlOverviewCard summary={summary} isLoading={isLoading} />
        </CardLayoutItem>
        <CardLayoutItem sm={SIZE_MD}>
          <CountryOverviewCard summary={summary} isLoading={isLoading} />
        </CardLayoutItem>
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    sum: state.summary
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitSummary: () => dispatch(actions.initSummary()),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, ""))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(OverviewContainer, axios));
