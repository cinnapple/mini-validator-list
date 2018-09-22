import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Card from "../../Common/Card";
import SelectableListItem from "../../Common/SelectableListItem";
import Map from "../../DomainMap/Map";
import { t, res } from "../../../services/i18nService";

const styles = theme => ({});

class CountryOverviewCard extends React.Component {
  render() {
    const { classes, theme, summary, vals, app, isLoading } = this.props;
    const { uniqueDomains } = vals;

    if (isLoading || !summary) {
      return <React.Fragment />;
    }

    const cardDefinition = {
      isTabbed: false,
      content: (
        <Map domains={uniqueDomains} themeType={app.themeType} height={370} />
      )
    };

    return <Card title="Node Operator Locations" card={cardDefinition} />;
  }
}

export default withStyles(styles, { withTheme: true })(CountryOverviewCard);
