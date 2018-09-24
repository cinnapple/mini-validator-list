import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import GenericDialog from "./GenericDialog";

const styles = theme => createStyles({});

type Props = {
  title: string;
  tabTitles: string[];
  open: boolean;
  onClose: () => void;
  classes?: any;
};

class TabbedDialog extends React.Component<Props, any> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, open, onClose, title, tabTitles, children } = this.props;
    const { value } = this.state;
    return (
      <GenericDialog
        title={title}
        open={open}
        onClose={onClose}
        secondToolbar={
          <AppBar position="relative">
            <Toolbar variant="dense">
              <Tabs value={value} onChange={this.handleChange}>
                {tabTitles.map(title => (
                  <Tab label={title} />
                ))}
              </Tabs>
            </Toolbar>
          </AppBar>
        }
      >
        {children[value]}
      </GenericDialog>
    );
  }
}

export default withStyles(styles)(TabbedDialog);
