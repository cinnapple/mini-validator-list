import React from "react";
import connect from "react-redux/es/connect/connect";

import withStyles from "@material-ui/core/styles/withStyles";

import axios from "../../util/axios-api";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";

import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 9999
  }
};

class SelectDialogContainer extends React.Component {
  render() {
    const { classes, isLoading } = this.props;

    let content = <React.Fragment />;
    if (isLoading) {
      content = (
        <div className={classes.root}>
          <LinearProgress color="secondary" />
        </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    nw: state.network
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(withNetworkHandler(SelectDialogContainer, axios)));
