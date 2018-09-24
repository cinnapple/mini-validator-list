import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const indicatorHeightPx = 3;

const styles = theme =>
  createStyles({
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

type Props = {
  labelFactory: (item) => JSX.Element;
  data: any[];
  onTabChange: (value: number) => void;
  selectedTab: number;
  theme?: any;
  classes?: any;
};

const MyTabs: React.SFC<Props> = ({
  classes,
  theme,
  data,
  selectedTab,
  onTabChange,
  labelFactory
}) => {
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
          label={labelFactory(d)}
        />
      ))}
    </Tabs>
  );
};

export default withStyles(styles, { withTheme: true })(MyTabs);
