import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme =>
  createStyles({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  });

const MySnackbarContent = ({
  classes,
  className,
  message,
  onClose,
  variant,
  ...other
}) => {
  const Icon = variant ? variantIcon[variant] : "";
  return (
    <SnackbarContent
      className={variant ? classNames(classes[variant], className) : ""}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {variant ? (
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
          ) : (
            <React.Fragment />
          )}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class MessageSnackbar extends React.Component<any, any> {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  }

  render() {
    const { classes, variant, children } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={variant}
            message={<span id="message-id">{children}</span>}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles2)(MessageSnackbar);
