import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({});

type Props = {
  classes?;
  title?: string;
};

const GenericList: React.SFC<Props> = ({ title, children }) => (
  <List style={{ width: "100%"}} subheader={title ? <ListSubheader>{title}</ListSubheader> : undefined}>
    {children}
  </List>
);

export default withStyles(styles)(GenericList);
