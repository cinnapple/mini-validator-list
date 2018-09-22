import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import ExpandablePanel from "../../../components/Common/ExpandablePanel";
import Loader from "../../../components/Common/Loader";
import Map from "../../../components/DomainMap/Map";
import SelectDomainButton from "./SelectDomainButton";
import { t, res } from "../../../services/i18nService";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  }
});

class DomainMap extends React.Component {
  state = {
    selectedDomain: undefined
  };

  handleSelectDomain = domain => {
    this.setState({
      selectedDomain: domain
    });
  };

  render() {
    const { classes, vals, app, isLoading, onDialogOpen } = this.props;
    const { uniqueDomains, positions } = vals;
    const { selectedDomain } = this.state;
    let content = <Loader speed={2} height={230} />;
    let footer = <React.Fragment />;

    if (!isLoading && uniqueDomains) {
      content = <Map domains={uniqueDomains} themeType={app.themeType} />;
      footer = (
        <div style={{ width: "100%", textAlign: "right" }}>
          <SelectDomainButton
            isLoading={isLoading}
            domains={uniqueDomains}
            onClick={(title, items) =>
              onDialogOpen(title, items, undefined, this.handleSelectDomain)
            }
          />
        </div>
      );
    }

    return (
      <ExpandablePanel
        className={classes.panel}
        title={t(res.DOMAINMAP)}
        expanded={false}
        footer={footer}
      >
        <div className={classes.wrapper} key="DomainMap">
          {content}
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DomainMap);
