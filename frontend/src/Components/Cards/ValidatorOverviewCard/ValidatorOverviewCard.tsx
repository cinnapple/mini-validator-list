import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core";

import PieChart from "../../Charts/PieChart";
import Card from "../../Common/Card";
import Typography from "@material-ui/core/Typography";
import { t, res } from "../../../services/i18nService";
import { _palette } from "../../../util/colors";

const styles = theme => createStyles({});

const ValidatorOverviewCard = ({ classes, theme, summary, isLoading }) => {
  const color = "green";

  if (isLoading || !summary) {
    return <React.Fragment />;
  }

  const cardDefinition = {
    isTabbed: true,
    initialTabIndex: 0,
    actionLinkText: "Details",
    actionLink: "/validators",
    data: [
      {
        title: "Total",
        value: summary.allValidatorsTotal,
        isPer: false,
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
                    (summary.allValidatorsVerified /
                      summary.allValidatorsTotal) *
                    100
                  ).toFixed(0)}
                  %
                </Typography>
                <Typography variant="subheading">
                  Verified
                  <br />
                  validators
                </Typography>
              </div>
            }
            data={[
              {
                x: "Verified",
                y: summary.allValidatorsVerified / summary.allValidatorsTotal
              },
              {
                x: "Unverified",
                y: summary.allValidatorsUnverified / summary.allValidatorsTotal
              }
            ]}
            color={color}
          />
        )
      },
      {
        title: "Dominance",
        value: (
          (summary.allValidatorsRipple / summary.allValidatorsTotal) *
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
                    (summary.allValidatorsNonRipple /
                      summary.allValidatorsTotal) *
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
                y: summary.allValidatorsNonRipple / summary.allValidatorsTotal
              },
              {
                x: "Ripple",
                y: summary.allValidatorsRipple / summary.allValidatorsTotal
              }
            ]}
            color={color}
          />
        )
      }
    ]
  };

  return <Card title="Active Validators" card={cardDefinition} />;
};

export default withStyles(styles, { withTheme: true })(ValidatorOverviewCard);
