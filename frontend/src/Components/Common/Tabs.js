import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Figure from "./Figure";

const indicatorHeightPx = 3;

const styles = theme => ({
  tabRoot: {
    width: "50%",
    maxWidth: "none",
    marginTop: `-${indicatorHeightPx}px`
  },
  tabsTabIndicatorRoot: {
    top: "0",
    height: `${indicatorHeightPx}px`
  },
  tabWrapper: {
    display: "block"
  },
  tabLabelContainer: {
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    paddingBottom: "0px"
  }
});

class MyTabs extends React.Component {
  render() {
    const { classes, theme, data, selectedTab, onTabChange } = this.props;

    return (
      <Tabs
        value={selectedTab}
        onChange={(event, value) => onTabChange(value)}
        indicatorColor="secondary"
        TabIndicatorProps={{
          classes: {
            root: classes.tabsTabIndicatorRoot
          }
        }}
      >
        {data.map((d, index) => (
          <Tab
            key={index}
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              labelContainer: classes.tabLabelContainer
            }}
            label={<Figure title={d.title} value={d.value} isPer={d.isPer} />}
          />
        ))}
      </Tabs>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyTabs);
