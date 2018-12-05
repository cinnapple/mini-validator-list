import * as React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";
import {
  getFilteredValidators,
  getFilteredStats,
  isFilterDifferent
} from "../../store/selectors";

import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import ContentLayout from "../../hoc/Layout/ContentLayout";
import CardLayout from "../../hoc/Layout/CardLayout";
import CardLayoutItem from "../../hoc/Layout/CardLayoutItem";

import ToolbarLayout from "../../hoc/Layout/ToolbarLayout";
import StatsCard from "../../components/Cards/StatsCard/StatsCard";
import DomainMapCard from "../../components/Cards/DomainMapCard/DomainMapCard";
import ValidatorListCard from "../../components/Cards/ValidatorListCard/ValidatorListCard";
import UnlCard from "../../components/Cards/UnlCard/UnlCard";

class UnlAnalyzerContainer extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitValidators();
  }

  render() {
    const {
      vals,
      app,
      isLoading,
      onSelectItemPanelOpen,
      onDialogOpen
    } = this.props;

    return (
      <React.Fragment>
        <ToolbarLayout title="UNL Analyzer" hideTitleOnXs />
        <ContentLayout>
          <CardLayout>
            <CardLayoutItem>
              <UnlCard vals={vals} isLoading={isLoading} />
            </CardLayoutItem>
            <CardLayoutItem>
              <StatsCard vals={vals} isLoading={isLoading} />
            </CardLayoutItem>
            <CardLayoutItem>
              <DomainMapCard
                vals={vals}
                app={app}
                isLoading={isLoading}
                onDomainSelectOpen={onSelectItemPanelOpen}
                onDialogOpen={onDialogOpen}
              />
            </CardLayoutItem>
            <CardLayoutItem>
              <ValidatorListCard vals={vals} isLoading={isLoading} />
            </CardLayoutItem>
          </CardLayout>
        </ContentLayout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: Store.RootReducer) => {
  const {
    filtered,
    filteredForTextSearch,
    filteredUnique
  } = getFilteredValidators(state.validators);
  const stats = getFilteredStats(state.validators);
  const filterModified = isFilterDifferent(state.validators);
  state.validators = {
    ...state.validators,
    filtered,
    filteredForTextSearch,
    filteredUnique,
    stats
  };
  return {
    vals: state.validators,
    unl: state.unl,
    app: state.app,
    filterModified: filterModified
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: () => dispatch(actions.fetchValidators()),
    onApplyFilter: filter => dispatch(actions.applyFilter(filter)),
    onResetFilter: () => dispatch(actions.resetFilter()),
    onInitArchives: () => dispatch(actions.fetchArchives()),
    onUpdateValidators: date => dispatch(actions.fetchValidators(date)),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, "")),
    onSelectItemPanelOpen: (title, items, handleSelect) =>
      dispatch(actions.openDialog(title, items, "", handleSelect)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(actions.openDialog(title, items, selectedValue, handleSelect))
  } as Containers.ValidatorsProps;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(UnlAnalyzerContainer));
