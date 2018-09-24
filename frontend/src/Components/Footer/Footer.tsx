import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";

import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import XRPTipBotButton from "../Common/XRPTipBotButton";

const styles = theme =>
  createStyles({
    icon: {
      fontSize: "110%"
    },
    footer: {
      width: "100%",
      marginBottom: "1rem"
    },
    innerWrapper: {
      width: "100%",
      textAlign: "center"
    }
  });

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.innerWrapper}>
        <XRPTipBotButton
          network="twitter"
          to="CinnappleFun"
          size={225}
          amount={0.2}
        />
        <IconButton
          aria-label="Twitter"
          component="a"
          href={"https://twitter.com/CinnappleFun"}
        >
          <Icon className={classNames("fab fa-twitter-square")} />
        </IconButton>
        <IconButton
          aria-label="GitHub"
          component="a"
          href={"https://github.com/cinnapple/mini-validator-list"}
        >
          <Icon className={classNames("fab fa-github-square")} />
        </IconButton>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);
