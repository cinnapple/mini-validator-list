import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SideDrawer from "../../components/Navigation/SideDrawer";

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing.unit * 1
      },
      [theme.breakpoints.up("sm")]: {
        padding: theme.spacing.unit * 3
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.drawerWidth
      }
    },
    navIconHide: {
      color: "white",
      position: "fixed",
      zIndex: 1200,
      top: "4px",
      [theme.breakpoints.up("sm")]: {
        top: "7px"
      },
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  });

class Layout extends React.Component<any, any> {
  state = {
    drawerOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ drawerOpen: !state.drawerOpen }));
  };

  render() {
    const { classes, children } = this.props;
    const { drawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <SideDrawer
          open={drawerOpen}
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <main className={classes.content}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          {children}
        </main>
      </div>
    );
  }
}
export default withStyles(styles)(Layout);
