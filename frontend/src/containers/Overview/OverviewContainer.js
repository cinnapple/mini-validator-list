import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import axios from "../../util/axios-api";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import CardLayout from "../../hoc/Layout/CardLayout";

import ValidatorOverviewCard from "../../components/Cards/ValidatorOverviewCard/ValidatorOverviewCard";
import DefaultUnlOverviewCard from "../../components/Cards/DefaultUnlOverviewCard/DefaultUnlOverviewCard";
import CountryOverviewCard from "../../components/Cards/CountryOverviewCard/CountryOverviewCard";

class OverviewContainer extends React.Component {
  componentDidMount() {
    this.props.onInitSummary();
    this.props.onInitReferrals();
  }

  render() {
    const { sum, ana, isLoading } = this.props;
    const { summary } = sum;

    return (
      <CardLayout sm={6}>
        <ValidatorOverviewCard summary={summary} isLoading={isLoading} />
        <DefaultUnlOverviewCard summary={summary} isLoading={isLoading} />
        <CountryOverviewCard summary={summary} isLoading={isLoading} />
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    sum: state.summary,
    ana: state.analytics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitSummary: () => dispatch(actions.initSummary()),
    onInitReferrals: () => dispatch(actions.initReferrals()),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, ""))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(OverviewContainer, axios));
