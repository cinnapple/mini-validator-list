import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import PieChart from "../../Charts/PieChart";
import Card from "../../Common/Card";
import SelectableListItem from "../../Common/SelectableListItem";
import Typography from "@material-ui/core/Typography";
import { t, res } from "../../../services/i18nService";
import { _palette } from "../../../util/colors";

const styles = theme => ({});

class DefaultUnlOverviewCard extends React.Component {
  render() {
    const { classes, theme, summary, isLoading } = this.props;
    const color = "green";

    if (isLoading || !summary) {
      return <React.Fragment />;
    }

    const cardDefinition = {
      isTabbed: true,
      initialTabIndex: 1,
      actionLinkText: "Details",
      actionLink: "/validators",
      data: [
        {
          title: "Total",
          value: summary.defaultUnlTotal,
          isPer: false,
          content: (
            <React.Fragment>
              <List>
                {summary &&
                  summary.defaultUnlTotalData.map((item, i) => (
                    <React.Fragment key={i}>
                      <Divider />
                      <SelectableListItem
                        leftPrimaryLabel={item.domain}
                        rightPrimaryLabel={item.count}
                      />
                    </React.Fragment>
                  ))}
              </List>
            </React.Fragment>
          )
        },
        {
          title: "Dominance",
          value: (
            (summary.defaultUnlDominance / summary.defaultUnlTotal) *
            100
          ).toFixed(0),
          isPer: true,
          content: (
            <PieChart
              width={"100%"}
              height={300}
              centerText={
                <div>
                  <Typography
                    variant="display2"
                    style={{
                      backgroundColor: "transparent",
                      fontWeight: "bold"
                    }}
                  >
                    {(
                      (summary.defaultUnlDominanceNonRippleTotal /
                        summary.defaultUnlTotal) *
                      100
                    ).toFixed(0)}
                    %
                  </Typography>
                  <Typography variant="body1">
                    Non-Ripple
                    <br />
                    validators
                  </Typography>
                </div>
              }
              data={[
                {
                  x: "Non-Ripple",
                  y:
                    summary.defaultUnlDominanceNonRippleTotal /
                    summary.defaultUnlTotal
                },
                {
                  x: "Ripple",
                  y:
                    summary.defaultUnlDominanceRippleTotal /
                    summary.defaultUnlTotal
                }
              ]}
              color={color}
            />
          )
        }
      ]
    };

    return <Card title="Default UNL" card={cardDefinition} />;
  }
}

export default withStyles(styles, { withTheme: true })(DefaultUnlOverviewCard);
