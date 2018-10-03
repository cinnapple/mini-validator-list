import * as React from "react";

import { withStyles, createStyles } from "@material-ui/core";

import PieChart from "../../Charts/PieChart";
import Card from "../../Common/Card";
import GenericList from "../../Common/GenericList";
import Typography from "@material-ui/core/Typography";
import { _palette } from "../../../util/colors";
import StackedListItem from "../../Common/StackedListItem";

const styles = theme => createStyles({});
const color = "green";

const DefaultUnlOverviewCard = ({ classes, theme, summary, isLoading }) => {
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
            <GenericList>
              {summary.defaultUnlTotalData.map((item, i) => (
                <StackedListItem
                  key={i}
                  leftPrimaryLabel={item.domain}
                  rightPrimaryLabel={item.count}
                />
              ))}
            </GenericList>
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
};

export default withStyles(styles, { withTheme: true })(DefaultUnlOverviewCard);
