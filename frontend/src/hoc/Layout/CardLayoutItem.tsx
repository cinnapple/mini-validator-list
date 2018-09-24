import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const gridItemBase = theme => ({
  marginBottom: theme.spacing.unit * 2,
  paddingLeft: theme.spacing.unit * 1,
  paddingRight: theme.spacing.unit * 1
});

const styles = theme =>
  createStyles({
    gridItem: {
      ...gridItemBase(theme)
    },
    gridItemTop: {
      ...gridItemBase(theme),
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing.unit * 2
      }
    }
  });

type Props = {
  classes?;
  children?;
  sm?: boolean | 2 | 1 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  isTop?: boolean;
};

const CardLayoutItem: React.SFC<Props> = ({ classes, children, sm, isTop }) => {
  return (
    <Grid
      item
      xs={12}
      sm={sm}
      className={isTop ? classes.gridItemTop : classes.gridItem}
    >
      {children}
    </Grid>
  );
};

export default withStyles(styles)(CardLayoutItem);
