import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Figure from "./Figure";

const styles = theme => createStyles({});

const MyTabs = ({ classes, theme, data }) => {
  let element = <React.Fragment />;

  if (data) {
    element = (
      <Grid container spacing={0}>
        {data.map((d, index) => (
          <Grid item key={index} xs={6} className={classes.gridItem}>
            <Figure
              key={index}
              title={d.title.toUpperCase()}
              value={d.value}
              isPer={d.isPer}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return element;
};

export default withStyles(styles, { withTheme: true })(MyTabs);
