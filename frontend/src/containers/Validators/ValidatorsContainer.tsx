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

import StatsCard from "../../components/Cards/StatsCard/StatsCard";
import DomainMapCard from "../../components/Cards/DomainMapCard/DomainMapCard";
import ValidatorListCard from "../../components/Cards/ValidatorListCard/ValidatorListCard";
import ToolbarLayout from "../../hoc/Layout/ToolbarLayout";
import ValidatorListToolbar from "../../components/ValidatorList/ValidatorListToolbar";
import {
  initialDefaultUnlFilterState,
  initialFilterState
} from "../../store/initialStates";

class ValidatorListContainer extends React.Component<any, any> {
  componentDidMount() {
    this.props.onInitValidators();
    this.props.onInitArchives();
  }

  handleApplyFilter = (type, value) => {
    let newFilter = {};
    if (type === "selectedUnl") {
      this.props.onUpdateValidators(value, newFilter);
      newFilter = {
        ...initialDefaultUnlFilterState,
        [type]: value
      };
    } else {
      newFilter = {
        ...this.props.vals.filter,
        [type]: value
      };
    }
    this.props.onApplyFilter(newFilter);
  };

  handleResetFilter = () => {
    this.props.onResetFilter();
    this.props.onUpdateValidators("", initialFilterState);
  };

  render() {
    const {
      vals,
      unl,
      app,
      isLoading,
      onSelectItemPanelOpen,
      onDialogOpen,
      filterModified
    } = this.props;

    return (
      <React.Fragment>
        <ToolbarLayout title="Validators" hideTitleOnXs>
          <ValidatorListToolbar
            vals={vals}
            unl={unl}
            isLoading={isLoading}
            onApplyFilter={this.handleApplyFilter}
            onResetFilter={this.handleResetFilter}
            filterModified={filterModified}
          />
        </ToolbarLayout>
        <ContentLayout>
          <CardLayout>
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
)(withNetworkHandler(ValidatorListContainer));
