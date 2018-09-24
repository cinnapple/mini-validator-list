import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core";

import { t, res } from "../../../services/i18nService";

import Button from "../../Common/Button";

const styles = theme => createStyles({});

const formatDomainName = domain => {
  const region =
    (domain.city ? domain.city + " " : "") +
    (domain.region_name ? domain.region_name + " " : "");
  const country = domain.country_name ? domain.country_name : "";
  const fullName = (region ? region + ", " : "") + country;
  return fullName || "Unknown";
};

const SelectDomainButton = ({ isLoading, domains, onClick }) => {
  const options = (() => {
    return (
      domains &&
      domains.map(item => ({
        primaryLabel: item.domain,
        secondaryLabel: formatDomainName(item),
        value: item.domain
      }))
    );
  })();

  const title = t(res.DOMAINMAP_LOCATE_DOMAIN);

  return (
    <Button
      disabled={isLoading}
      buttonText={title}
      onClick={() => onClick(title, options)}
    />
  );
};

export default withStyles(styles)(SelectDomainButton);
