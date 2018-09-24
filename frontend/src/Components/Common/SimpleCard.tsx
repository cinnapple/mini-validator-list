import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = theme =>
  createStyles({
    card: {
      backgroundColor: theme.palette.type === "light" ? "#eee" : undefined,
      boxShadow: "none",
      border: "1px solid #ccc"
    }
  });

const SimpleCard = ({ classes, description, value }) => {
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {value}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SimpleCard);
