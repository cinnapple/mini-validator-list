import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme =>
  createStyles({
    cardRoot: {
      boxShadow: "none"
    },
    cardContentRoot: {
      textAlign: "left"
    }
  });

const Figure = ({ classes, title, value, isPer }) => {
  return (
    <Card
      key={title}
      className={classes.figureCard}
      classes={{ root: classes.cardRoot }}
    >
      <CardContent classes={{ root: classes.cardContentRoot }}>
        <Typography variant="body1" style={{ marginBottom: "10px" }}>
          {title}
        </Typography>
        <Typography variant="display1" align="left">
          {value}
          {isPer ? <span style={{ fontSize: "80%" }}>&nbsp;%</span> : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(Figure);
