import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/SearchRounded";
import KeyIcon from "@material-ui/icons/VpnKeyRounded";
import IntegrationAutosuggest from "../Common/IntegrationAutosuggest";
import FilterButton from "./FilterButton";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/ClearRounded";

const buttonStyleBase = theme => ({
  width: theme.spacing.unit * 6,
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const styles = theme =>
  createStyles({
    root: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing.unit,
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 6,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    filterDivider: {
      borderLeft: "1px solid white",
      height: "70%",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      right: 48,
      opacity: 0.3
    },
    clearButton: {
      ...(buttonStyleBase(theme) as any),
      right: 48
    },
    filterButton: {
      ...(buttonStyleBase(theme) as any),
      right: 0
    },
    searchInput: {
      marginRight: 48 * 2
    },
    input: {
      color: "white",
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 6,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 300
      }
    }
  });

class SearchInput extends React.Component<any, any> {
  div = React.createRef() as any;
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: this.div.current
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const {
      classes,
      list,
      filter,
      unl,
      value,
      onApplyFilter,
      onResetFilter,
      filterModified
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <div ref={this.div} className={classes.root}>
        <div className={classes.searchIcon}>
          {filter.searchFor === "domain" && <SearchIcon />}
          {filter.searchFor === "key" && <KeyIcon />}
        </div>
        {filterModified && (
          <div className={classes.clearButton}>
            <IconButton
              onClick={onResetFilter}
              disableTouchRipple
              disableRipple
              color="inherit"
            >
              <ClearIcon />
            </IconButton>
          </div>
        )}
        <div className={classes.filterButton}>
          <div className={classes.filterDivider} />
          <FilterButton
            filter={filter}
            onApplyFilter={onApplyFilter}
            unl={unl}
            anchorEl={anchorEl}
            onPopoverButtonClick={this.handleClick}
            onPopoverClose={this.handleClose}
          />
        </div>
        <div className={classes.searchInput}>
          <IntegrationAutosuggest
            classes={{ input: classes.input }}
            placeholder={`Search by ${filter.searchFor}…`}
            list={list}
            value={value}
            handleFilterChange={value => onApplyFilter("filterWord", value)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SearchInput);
