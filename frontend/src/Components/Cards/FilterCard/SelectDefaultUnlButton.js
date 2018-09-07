import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { t, res } from "../../../services/i18nService";

import Button from "../../Common/Button";

const styles = theme => ({});

class SelectDefaultUnlButton extends React.Component {
  render() {
    const { isLoading, archives, onClick } = this.props;
    const options = (() => {
      return (
        archives &&
        archives.map(item => ({
          primaryLabel: item.date || "Latest",
          secondaryLabel: item.name,
          value: item.id
        }))
      );
    })();

    const title = t(res.LOAD_ANOTHER_DEFAULT_UNL);

    return (
      <Button
        disabled={isLoading}
        buttonText={title}
        onClick={() => onClick(title, options)}
      />
    );
  }
}

export default withStyles(styles)(SelectDefaultUnlButton);
