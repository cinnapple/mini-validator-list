import * as React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import CardLayout from "../../hoc/Layout/CardLayout";
import CardLayoutItem from "../../hoc/Layout/CardLayoutItem";

import ValidatorOverviewCard from "../../components/Cards/ValidatorOverviewCard/ValidatorOverviewCard";
import DefaultUnlOverviewCard from "../../components/Cards/DefaultUnlOverviewCard/DefaultUnlOverviewCard";
import DefaultUnlMovementCard from "../../components/Cards/DefaultUnlMovementCard/DefaultUnlMovementCard";
import CountryOverviewCard from "../../components/Cards/CountryOverviewCard/CountryOverviewCard";
import ToolbarLayout from "../../hoc/Layout/ToolbarLayout";
import ContentLayout from "../../hoc/Layout/ContentLayout";
import { getFilteredValidatorsForCountryOverview } from "../../store/selectors";

const SIZE_XS = 3;
const SIZE_SM = 6;
const SIZE_MD = 9;
const SIZE_LG = 12;

class OverviewContainer extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitSummary();
    this.props.onInitValidators();
  }

  render() {
    const { sum, validatorList, app, isLoading } = this.props;
    const { stats } = sum;

    if (!stats) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        <ToolbarLayout title="Home" />
        <ContentLayout>
          <CardLayout>
            <CardLayoutItem sm={SIZE_SM}>
              <ValidatorOverviewCard summary={stats} isLoading={isLoading} />
            </CardLayoutItem>
            <CardLayoutItem sm={SIZE_SM}>
              <DefaultUnlOverviewCard summary={stats} isLoading={isLoading} />
            </CardLayoutItem>
            <CardLayoutItem sm={SIZE_LG}>
              <DefaultUnlMovementCard
                list={validatorList}
                app={app}
                isLoading={isLoading}
              />
            </CardLayoutItem>
            <CardLayoutItem sm={SIZE_LG}>
              <CountryOverviewCard
                list={validatorList}
                app={app}
                isLoading={isLoading}
              />
            </CardLayoutItem>
          </CardLayout>
        </ContentLayout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const filteredForCountryOverview = getFilteredValidatorsForCountryOverview(
    state.validators
  );
  return {
    sum: state.summary,
    validatorList: filteredForCountryOverview,
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: () => dispatch(actions.fetchValidators("")),
    onApplyFilters: filter => dispatch(actions.applyFilter(filter)),
    onInitSummary: () => dispatch(actions.initSummary()),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, ""))
  } as Containers.OverviewProps;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(OverviewContainer));
