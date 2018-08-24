import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Card from "../../Common/Card";
import SelectableListItem from "../../Common/SelectableListItem";
import GeoChart from "../../Charts/GeoChart";
import { t, res } from "../../../services/i18nService";

const styles = theme => ({});

class CountryOverviewCard extends React.Component {
  render() {
    const { classes, theme, summary, isLoading } = this.props;

    if (isLoading || !summary) {
      return <React.Fragment />;
    }

    const cardDefinition = {
      isTabbed: true,
      data: [
        {
          title: "Total",
          value: summary.summaryVerifiedGroupByCountryTotal,
          isPer: false,
          fixedContent: (
            <GeoChart
              data={summary.summaryVerifiedGroupByCountryData}
              color="green"
            />
          ),
          content: (
            <React.Fragment>
              <List>
                {summary &&
                  summary.summaryVerifiedGroupByCountryData.map((item, i) => (
                    <React.Fragment key={i}>
                      <Divider />
                      <SelectableListItem
                        leftPrimaryLabel={item.country_name}
                        rightPrimaryLabel={item.count}
                      />
                    </React.Fragment>
                  ))}
              </List>
            </React.Fragment>
          )
        },
        {
          title: "Default UNL",
          value: summary.summaryDefaultUnlGroupByCountryTotal,
          isPer: false,
          fixedContent: (
            <GeoChart
              data={summary.summaryDefaultUnlGroupByCountryData}
              color="green"
            />
          ),
          content: (
            <React.Fragment>
              <List>
                {summary &&
                  summary.summaryDefaultUnlGroupByCountryData.map((item, i) => (
                    <React.Fragment key={i}>
                      <Divider />
                      <SelectableListItem
                        leftPrimaryLabel={item.country_name}
                        rightPrimaryLabel={item.count}
                      />
                    </React.Fragment>
                  ))}
              </List>
            </React.Fragment>
          )
        }
      ]
    };

    return <Card title="Breakdown by Country" card={cardDefinition} />;
  }
}

export default withStyles(styles, { withTheme: true })(CountryOverviewCard);
