import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import SearchInput from "./SearchInput";

const styles = theme =>
  createStyles({
    panel: {
      width: "100%"
    },
    wrapper: {
      width: "100%"
    },
    button: {
      marginTop: theme.spacing.unit
    },
    buttonXs: {
      marginTop: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    iconSmall: {
      fontSize: 20
    },
    clearFilterButton: {
      color: theme.palette.primary
    },
    lastNHours_FormCotnrolRoot: {
      display: "inherit"
    },
    grow: {
      flexGrow: 1
    },
    filterButton: {
      position: "relative",
      display: "flex"
    },
    spacer: {
      [theme.breakpoints.up("md")]: {
        height: "20rem"
      }
    }
  });

type Props = {
  vals: Store.State.Validator;
  unl: Store.State.Unl;
  isLoading: boolean;
  onApplyFilter: (type, value) => void;
  onResetFilter: () => void;
  classes?: any;
  filterModified?: boolean;
};

type States = {
  isFilterDialogOpen?: boolean;
  isFilterDifferent?: boolean;
  value?: number;
};

class ValidatorListToolbar extends React.Component<Props, States> {
  state = {
    isFilterDialogOpen: false
  };

  render() {
    const {
      classes,
      vals,
      unl,
      onApplyFilter,
      onResetFilter,
      filterModified
    } = this.props;
    const { filter, filteredForTextSearch } = vals;
    const { filterWord } = filter;

    return (
      <SearchInput
        value={filterWord}
        list={filteredForTextSearch}
        unl={unl}
        filter={filter}
        onApplyFilter={onApplyFilter}
        onResetFilter={onResetFilter}
        filterModified={filterModified}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ValidatorListToolbar);
