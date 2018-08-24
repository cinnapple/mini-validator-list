import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = theme => {
  const gridItemBase = {
    marginBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1
  };
  return {
    gridItem: {
      ...gridItemBase
    },
    gridItemTop: {
      ...gridItemBase,
      [theme.breakpoints.down("xs")]: {
        marginTop: theme.spacing.unit * 2
      }
    }
  };
};

class CardLayout extends React.Component {
  render() {
    const { classes, children, sm } = this.props;

    return (
      <Grid container spacing={0}>
        {children.map((child, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={sm}
            className={index === 0 ? classes.gridItemTop : classes.gridItem}
          >
            {child}
          </Grid>
        ))}
      </Grid>
    );
  }
}
export default withStyles(styles)(CardLayout);
