import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import Card from "../../Common/Card";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SelectableListItem from "../../Common/SelectableListItem";
import { t, res } from "../../../services/i18nService";
import { _palette } from "../../../util/colors";

const styles = theme => ({});

const allowedDomains = (referral) => {
  return referral.domain === "reddit.com" || referral.domain === "xrpchat.com";
}

class DiscussionListCard extends React.Component {
  render() {
    const { classes, theme, referres, isLoading } = this.props;
    const color = "green";

    if (isLoading || !referres) {
      return <React.Fragment />;
    }

    const cardDefinition = {
      content: (
        <React.Fragment>
          <List>
            {referres &&
              referres.filter(allowedDomains).map((item, i) => (
                <React.Fragment key={i}>
                  <SelectableListItem leftPrimaryLabel={item.title} />
                </React.Fragment>
              ))}
          </List>
        </React.Fragment>
      )
    };

    return <Card title="Forum" card={cardDefinition} />;
  }
}

export default withStyles(styles, { withTheme: true })(DiscussionListCard);
