import * as React from "react";

import { withStyles, createStyles } from "@material-ui/core";
import Card from "../../Common/Card";
import StackBarChart from "../../Charts/StackBarChart";

const styles = theme => createStyles({});
const color = "green";

const DefaultUnlMovementCard = ({ classes, data, app, isLoading }) => {
  if (isLoading || !data) {
    return <React.Fragment />;
  }

  const cardDefinition = {
    isTabbed: false,
    content: <StackBarChart data={data} color={color} />
  };

  return <Card title="Default UNL Dominance Movement" card={cardDefinition} />;
};

export default withStyles(styles, { withTheme: true })(DefaultUnlMovementCard);
