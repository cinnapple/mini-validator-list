import * as React from "react";

import { withStyles, createStyles } from "@material-ui/core";
import Card from "../../Common/Card";
import Map from "../../DomainMap/Map";

const styles = theme => createStyles({});

const CountryOverviewCard = ({ classes, list, app, isLoading }) => {
  if (isLoading || !list) {
    return <React.Fragment />;
  }

  const cardDefinition = {
    isTabbed: false,
    content: <Map domains={list} themeType={app.themeType} height={370} />
  };

  return <Card title="Node Operator Locations" card={cardDefinition} />;
};

export default withStyles(styles, { withTheme: true })(CountryOverviewCard);
