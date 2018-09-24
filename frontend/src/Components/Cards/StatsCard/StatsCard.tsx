import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import ExpandablePanel from "../../Common/ExpandablePanel";
import ResultStatsPanel from "../../Stats/ResultStatsPanel";
import { t, res } from "../../../services/i18nService";

const styles = theme =>
  createStyles({
    panel: {
      width: "100%"
    },
    wrapper: {
      width: "100%"
    },
    circle: {
      color:
        theme.palette.primary[
          theme.palette.type === "dark" ? "contrastText" : "main"
        ]
    }
  });

const createCircle = classes => (
  <CircularProgress size={23} thickness={4} className={classes.circle} />
);

const StatsCard = ({ classes, vals, isLoading }) => {
  const statsList = [];
  const size = {
    xs: 6,
    sm: 3
  };

  statsList.push({
    description: t(res.STATS_VALIDATORS),
    value: createCircle(classes),
    size
  });
  statsList.push({
    description: t(res.STATS_IN_DEFAULT_UNL),
    value: createCircle(classes),
    size
  });
  statsList.push({
    description: t(res.STATS_RUN_BY_RIPPLE),
    value: createCircle(classes),
    size
  });
  statsList.push({
    description: t(res.STATS_DOMINANCE),
    value: createCircle(classes),
    size
  });

  if (!isLoading && vals.stats) {
    statsList[0].value = vals.stats.total;
    statsList[1].value = vals.stats.default;
    statsList[2].value = vals.stats.runByRipple;
    statsList[3].value = Math.round(vals.stats.dominance * 100) + "%";
  }

  return (
    <ExpandablePanel
      className={classes.panel}
      title={t(res.STATS)}
      expanded={true}
    >
      <div className={classes.wrapper}>
        <ResultStatsPanel statsList={statsList} />
      </div>
    </ExpandablePanel>
  );
};

export default withStyles(styles, { withTheme: true })(StatsCard);
