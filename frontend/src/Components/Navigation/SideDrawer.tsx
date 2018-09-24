import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";

import Hidden from "@material-ui/core/Hidden";
import NavigationItems from "./NavigationItems";

const styles = theme =>
  createStyles({
    drawerPaper: {
      width: theme.drawerWidth,
      zIndex: 1002,
      overflowX: "hidden"
    }
  });

type Props = {
  classes?;
  open: boolean;
  handleDrawerToggle: any;
};

const SideDrawer: React.SFC<Props> = ({
  classes,
  open,
  handleDrawerToggle
}) => (
  <React.Fragment>
    <Hidden mdUp>
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={open}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <NavigationItems handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
    </Hidden>
    <Hidden smDown implementation="css">
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <NavigationItems />
      </Drawer>
    </Hidden>
  </React.Fragment>
);

export default withStyles(styles)(SideDrawer);
