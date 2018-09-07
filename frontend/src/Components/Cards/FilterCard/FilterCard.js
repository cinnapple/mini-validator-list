import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import ExpandablePanel from "../../Common/ExpandablePanel";
import IntegrationAutosuggest from "../../Filter/IntegrationAutosuggest";
import Button from "../../Common/Button";
import SelectDefaultUnlButton from "./SelectDefaultUnlButton";
import { t, res } from "../../../services/i18nService";

const styles = theme => ({
  panel: {
    width: "100%"
  },
  wrapper: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit
  },
  buttonXs: {
    marginTop: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  clearFilterButton: {
    color: theme.palette.primary
  },
  lastNHours_FormCotnrolRoot: {
    display: "inherit"
  }
});

const urlbase = "https://minivalist.cinn.app";

class Filter extends React.Component {
  state = {
    shareUrl: urlbase
  };

  handleApplyFilter = (type, value) => {
    const newFilter = {
      ...this.props.vals.filter,
      [type]: value
    };
    if (type === "lastNHours") {
      const date = this.props.vals.selectedDefaultUnlId;
      this.props.onUpdateValidators(date, newFilter);
    } else {
      this.props.onApplyFilter(newFilter);
    }
  };

  handleClear = () => {
    this.props.onDefaultUnlUnselected();
  };

  render() {
    const {
      classes,
      vals,
      isLoading,
      handleDefaultUnlSelected,
      onDialogOpen
    } = this.props;
    const { archives, selectedDefaultUnlId, filter } = vals;
    const {
      defaultOnly,
      verifiedOnly,
      mainNetOnly,
      filterWord,
      lastNHours
    } = filter;
    const isDisabled =
      isLoading ||
      (vals.archives && vals.selectedDefaultUnlId !== vals.archives[0].id);

    const footer = (
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Button
            disabled={isLoading}
            className={classes.clearFilterButton}
            buttonText={t(res.FILTER_CLEAR)}
            onClick={this.handleClear}
          />
        </Grid>
        <Grid item xs={9} style={{ textAlign: "right" }}>
          <SelectDefaultUnlButton
            isLoading={isLoading}
            archives={archives}
            onClick={(title, items) =>
              onDialogOpen(
                title,
                items,
                selectedDefaultUnlId,
                handleDefaultUnlSelected
              )
            }
          />
        </Grid>
      </Grid>
    );

    return (
      <ExpandablePanel
        className={classes.panel}
        title={t(res.FILTER)}
        expanded={true}
        footer={footer}
      >
        <div className={classes.wrapper} key="Filter">
          <FormGroup row>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={0} />
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={defaultOnly}
                        disabled={isDisabled}
                        onChange={e =>
                          this.handleApplyFilter("defaultOnly", !defaultOnly)
                        }
                        value="defaultOnly"
                      />
                    }
                    label={t(res.FILTER_BY_DEFAULT_UNL_ONLY)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={verifiedOnly}
                        disabled={isDisabled}
                        onChange={e =>
                          this.handleApplyFilter("verifiedOnly", !verifiedOnly)
                        }
                        value="verifiedOnly"
                      />
                    }
                    label={t(res.FILTER_BY_VERIFIED_DOMAINS_ONLY)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mainNetOnly}
                        disabled={isDisabled}
                        onChange={e =>
                          this.handleApplyFilter("mainNetOnly", !mainNetOnly)
                        }
                        value="mainNetOnly"
                      />
                    }
                    label={t(res.FILTER_BY_MAIN_NET_ONLY)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} style={{ display: "flex" }}>
                <Grid container spacing={8}>
                  <Grid item xs={12}>
                    <FormControl
                      className={classes.formControl}
                      classes={{
                        root: classes.lastNHours_FormCotnrolRoot
                      }}
                    >
                      <InputLabel htmlFor="age-simple">
                        {t(res.FILTER_BY_LAST_N_HOURS)}
                      </InputLabel>
                      <Select
                        value={lastNHours}
                        onChange={e =>
                          this.handleApplyFilter("lastNHours", e.target.value)
                        }
                        disabled={isDisabled}
                        displayEmpty
                        name="age"
                        className={classes.selectEmpty}
                      >
                        <MenuItem value={6}>
                          {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, { n: 6 })}
                        </MenuItem>
                        <MenuItem value={12}>
                          {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, { n: 12 })}
                        </MenuItem>
                        <MenuItem value={24}>
                          {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, { n: 24 })}
                        </MenuItem>
                        <MenuItem value={24 * 7}>
                          {t(res.FILTER_BY_LAST_N_HOURS_LAST_1_WEEK)}
                        </MenuItem>
                        <MenuItem value={-1}>
                          {t(res.FILTER_BY_LAST_N_HOURS_ALL_TIME)}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <IntegrationAutosuggest
                      label={t(res.FILTER_BY_DOMAIN_NAME)}
                      placeholder="e.g. ripple.com"
                      list={vals.filteredValidatorsForAutosuggest}
                      value={filterWord}
                      handleFilterChange={value =>
                        this.handleApplyFilter("filterWord", value)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </div>
      </ExpandablePanel>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Filter);
