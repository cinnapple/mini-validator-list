import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import Filter from "./Panels/Filter";
import Stats from "./Panels/Stats";
import DomainMap from "./Panels/DomainMap";
import ValidatorList from "./Panels/ValidatorList";
import LastUpdatedInfoBar from "../../components/Common/LastUpdatedInfoBar";

const styles = theme => ({
  gridItem: {
    marginBottom: theme.spacing.unit * 2
  },
  gridItemBottom: {
    marginBottom: theme.spacing.unit * 1
  },
  tooltip: {
    fontFamily: ["'Montserrat'", "Roboto"].join(",")
  }
});

class Component extends React.Component {
  componentDidMount() {
    this.props.onInitValidators();
  }

  render() {
    const { classes, vals } = this.props;

    return (
      <React.Fragment>
        {vals.ready ? (
          <React.Fragment>
            <Grid container spacing={0}>
              <Grid item xs={12} className={classes.gridItem}>
                <Filter />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <Stats />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <DomainMap />
              </Grid>
              <Grid item xs={12} className={classes.gridItemBottom}>
                <ValidatorList />
              </Grid>
            </Grid>
            <LastUpdatedInfoBar vals={vals} />
          </React.Fragment>
        ) : (
          <LinearProgress color="secondary" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    vals: state.validators
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitValidators: () => dispatch(actions.initValidators())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Component));
