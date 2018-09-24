import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import SimpleCard from "../Common/SimpleCard";

const styles = theme => createStyles({});

const ResultStatsPanel = ({ classes, statsList }) => {
  return (
    <Grid container spacing={16}>
      {statsList.map((statsItem, index) => (
        <Grid
          key={`resultstatspanel-${index}`}
          item
          xs={statsItem.size.xs}
          sm={statsItem.size.sm}
        >
          <SimpleCard
            value={statsItem.value}
            description={statsItem.description}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ResultStatsPanel);
