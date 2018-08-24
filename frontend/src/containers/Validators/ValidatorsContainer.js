import React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";

import axios from "../../util/axios-api";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import CardLayout from "../../hoc/Layout/CardLayout";

import FilterCard from "../../components/Cards/FilterCard/FilterCard";
import StatsCard from "../../components/Cards/StatsCard/StatsCard";
import DomainMapCard from "../../components/Cards/DomainMapCard/DomainMapCard";
import ValidatorListCard from "../../components/Cards/ValidatorListCard/ValidatorListCard";

class MainContainer extends React.Component {
  componentDidMount() {
    this.props.onInitValidators();
  }

  componentWillReceiveProps(props) {
    if (this.props.vals.selectedDefaultUnlId) {
      if (
        this.props.vals.selectedDefaultUnlId !== props.vals.selectedDefaultUnlId
      ) {
        const date = props.vals.selectedDefaultUnlId;
        const filter = {
          defaultOnly: true,
          verifiedOnly: true,
          mainNetOnly: true,
          filterWord: ""
        };
        this.props.onInitValidators(date, filter);
      }
    }
  }

  render() {
    const {
      vals,
      app,
      isLoading,
      onApplyFilter,
      onDefaultUnlSelected,
      onSelectItemPanelOpen,
      onDialogOpen
    } = this.props;

    return (
      <CardLayout>
        <FilterCard
          vals={vals}
          app={app}
          isLoading={isLoading}
          onApplyFilter={onApplyFilter}
          onDefaultUnlSelected={onDefaultUnlSelected}
          onDefaultUnlSelectOpen={onSelectItemPanelOpen}
          onDialogOpen={onDialogOpen}
        />
        <StatsCard vals={vals} isLoading={isLoading} />
        <DomainMapCard
          vals={vals}
          app={app}
          isLoading={isLoading}
          onDomainSelectOpen={onSelectItemPanelOpen}
          onDialogOpen={onDialogOpen}
        />
        <ValidatorListCard vals={vals} isLoading={isLoading} />
      </CardLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    vals: state.validators,
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: (date, filter) =>
      dispatch(actions.initValidators(date, filter)),
    showNotification: (message, variant) =>
      dispatch(actions.showNotification(message, variant, "")),
    onSelectItemPanelOpen: (title, items, handleSelect) =>
      dispatch(actions.openDialog(title, items, handleSelect)),
    onApplyFilter: newFilter => dispatch(actions.filterValidators(newFilter)),
    onDefaultUnlSelected: date => dispatch(actions.selectDefaultUnl(date)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(
        actions.openDialog({
          title,
          items,
          handleSelect,
          selectedValue
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(MainContainer, axios));
