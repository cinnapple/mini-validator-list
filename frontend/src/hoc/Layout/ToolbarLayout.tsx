import * as React from "react";
import {
  withStyles,
  createStyles,
  WithStyles,
  Divider,
  withWidth
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = theme =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${theme.drawerWidth}px)`
      }
    },
    navIconHide: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    languageIcon: {
      position: "absolute",
      right: "1rem"
    },
    subTitle: {
      fontSize: "110%",
      marginLeft: "1.5rem",
      float: "left"
    },
    toolbarRoot: {
      [theme.breakpoints.down("sm")]: {
        marginLeft: "2rem"
      }
    },
    grow: {
      flexGrow: 1
    }
  });

type Props = {
  classes?;
  title?: string;
  children?;
  width: string;
  hideTitleOnXs?: boolean;
};

const MyToolbar: React.SFC<Props> = ({
  classes,
  title,
  hideTitleOnXs = false,
  width,
  children
}) => {
  const isArray = Array.isArray(children);

  const hideTitle = width === "xs" && hideTitleOnXs;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar classes={{ root: classes.toolbarRoot }}>
        {!hideTitle &&
          title && (
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.subTitle}
            >
              {title}
            </Typography>
          )}
        <div className={classes.grow} />
        {isArray ? children[0] : children}
        <div className={classes.grow} />
      </Toolbar>
      {isArray && <Divider color="secondary" />}
      {isArray && (
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          <div className={classes.grow} />
          {children[1]}
          <div className={classes.grow} />
        </Toolbar>
      )}
    </AppBar>
  );
};

export default withStyles(styles)(withWidth()(MyToolbar));
