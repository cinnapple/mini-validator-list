import * as React from "react";
import { withStyles, createStyles, TextField } from "@material-ui/core";

const styles = theme =>
  createStyles({
    panel: {
      width: "100%"
    },
    wrapper: {
      width: "100%"
    },
    circle: {
      color:
        theme.palette.primary[
          theme.palette.type === "dark" ? "contrastText" : "main"
        ]
    }
  });

const StatsCard = ({ classes, vals, isLoading }) => {
  return (
    <div className={classes.wrapper}>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={""}
        margin="normal"
        multiline
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(StatsCard);
