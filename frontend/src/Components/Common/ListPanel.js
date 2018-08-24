import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

const styles = theme => ({});

class ListPanel extends React.Component {
  render() {
    const { classes, title, children } = this.props;

    const elements = [];
    children.forEach((child, index) => {
      elements.push(<Divider key={`${title}-divider-${index}`} />);
      elements.push(child);
    });

    return (
      <Paper>
        <List subheader={<ListSubheader>{title}</ListSubheader>}>
          {elements}
        </List>
      </Paper>
    );
  }
}
export default withStyles(styles)(ListPanel);
