import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

const styles = theme => createStyles({});

const CardLayout = ({ classes, children }) => {
  return (
    <Grid container spacing={0}>
      {children}
    </Grid>
  );
};
export default withStyles(styles)(CardLayout);
