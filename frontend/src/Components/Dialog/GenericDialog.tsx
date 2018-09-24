import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBackRounded";
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const styles = theme =>
  createStyles({
    appBar: {},
    flex: {
      flex: 1,
      fontSize: "130%",
      marginLeft: "1rem"
    },
    toolbar: {
      margin: "2rem"
    },
    dialogContentRoot: {
      padding: 0,
      "&:first-child": {
        padding: 0
      },
      [theme.breakpoints.up("md")]: {
        minWidth: "30rem"
      }
    },
    dialogRoot: {
      [theme.breakpoints.up("md")]: {
        maxHeight: "50rem"
      }
    }
  });

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type Props = {
  classes;
  fullScreen?;
  title: string;
  secondToolbar?: JSX.Element;
  open;
  onClose;
  children;
};

const GenericDialog: React.SFC<Props> = ({
  classes,
  fullScreen,
  title,
  secondToolbar,
  open,
  onClose,
  children
}) => (
  <Dialog
    fullScreen={fullScreen}
    open={open}
    maxWidth="md"
    classes={{ root: classes.dialogRoot }}
    onClose={onClose}
    TransitionComponent={Transition}
    scroll="paper"
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        {fullScreen && (
          <IconButton color="inherit" onClick={onClose} aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography
          variant="subheading"
          color="inherit"
          className={classes.flex}
        >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    {secondToolbar ? (
      <React.Fragment>
        <div style={{ margin: "2rem" }} />
        {secondToolbar}
      </React.Fragment>
    ) : (
      <div style={{ margin: "2.1rem" }} />
    )}
    <DialogContent classes={{ root: classes.dialogContentRoot }}>
      <div className={classes.content}>{children}</div>
    </DialogContent>
  </Dialog>
);

export default withStyles(styles, { withTheme: true })(
  withMobileDialog<Props>()(GenericDialog)
);
