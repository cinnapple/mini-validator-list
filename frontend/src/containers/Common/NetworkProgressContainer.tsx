import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import connect from "react-redux/es/connect/connect";
import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 9999
    }
  });

class NetworkProgressContainer extends React.Component<any, any> {
  render() {
    const { classes, isLoading } = this.props;

    let content = <React.Fragment />;
    if (isLoading) {
      content = (
        <div className={classes.root}>
          <LinearProgress color="secondary" style={{ height: 2 }} />
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
)(withStyles(styles)(withNetworkHandler(NetworkProgressContainer)));
