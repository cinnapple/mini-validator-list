import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    toolbar: {
      marginTop: "4rem",
      [theme.breakpoints.up("sm")]: {
        marginTop: "4rem"
      }
    },
    innerContent: {
      maxWidth: "768px",
      margin: "0 auto"
    }
  });

const ContentLayout = ({ classes, children }) => {
  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <div className={classes.innerContent}>{children}</div>
    </React.Fragment>
  );
};
export default withStyles(styles)(ContentLayout);
