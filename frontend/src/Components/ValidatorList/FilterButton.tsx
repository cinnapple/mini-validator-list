import * as React from "react";
import {
  withStyles,
  createStyles,
  Divider,
  withWidth
} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterListRounded";

import StackedListItem from "../Common/StackedListItem";
import GenericList from "../Common/GenericList";
import { t, res } from "../../services/i18nService";

const styles = theme =>
  createStyles({
    typography: {
      margin: theme.spacing.unit * 2
    }
  });

type Props = {
  unl: Store.State.Unl;
  filter: Store.State.Filter;
  onApplyFilter: (type, value) => void;
  classes?;
  anchorEl: any;
  onPopoverButtonClick: (event) => void;
  onPopoverClose: () => void;
  width: string;
};

let lastWidth = 0;

class FilterButton extends React.Component<Props, any> {
  render() {
    const {
      classes,
      onApplyFilter,
      filter,
      unl,
      anchorEl,
      onPopoverButtonClick,
      onPopoverClose,
      width
    } = this.props;
    const { unls } = unl;
    const open = Boolean(anchorEl);
    const {
      defaultOnly,
      verifiedOnly,
      mainNetOnly,
      lastNHours,
      searchFor,
      selectedUnl
    } = filter;

    const isFitleringDisabled = selectedUnl !== "";

    let popoverWidth = anchorEl ? anchorEl.clientWidth : lastWidth;
    if (width === "xs") {
      popoverWidth = window.innerWidth - 50;
    }
    lastWidth = popoverWidth;

    return (
      <div>
        <IconButton
          aria-owns={open ? "simple-popper" : null}
          aria-haspopup="true"
          onClick={onPopoverButtonClick}
          disableTouchRipple
          disableRipple
          color="inherit"
        >
          <FilterListIcon />
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={onPopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div style={{ width: popoverWidth }}>
            {/* <GenericList title="Search Method">
              <StackedListItem
                leftPrimaryLabel={"Search by"}
                rightComponent={
                  <Select
                    value={searchFor}
                    onChange={e => onApplyFilter("searchFor", e.target.value)}
                  >
                    <MenuItem value={"domain"}>Domain</MenuItem>
                    <MenuItem value={"key"}>Public Key</MenuItem>
                  </Select>
                }
              />
            </GenericList> */}
            <Divider />
            <GenericList title="Base UNL">
              <StackedListItem
                leftPrimaryLabel={"UNL"}
                rightComponent={
                  <Select
                    value={selectedUnl || "Latest"}
                    onChange={e =>
                      onApplyFilter(
                        "selectedUnl",
                        e.target.value === "Latest" ? "" : e.target.value
                      )
                    }
                  >
                    {unls.map((u, i) => {
                      const label = !u.id ? u.name : u.date;
                      return (
                        <MenuItem key={i} value={u.id || "Latest"}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                }
              />
            </GenericList>
            <Divider />
            <GenericList title="Filter">
              <StackedListItem
                leftPrimaryLabel={t(res.FILTER_BY_LAST_N_HOURS)}
                rightComponent={
                  <Select
                    disabled={isFitleringDisabled}
                    value={lastNHours}
                    onChange={e => onApplyFilter("lastNHours", e.target.value)}
                  >
                    <MenuItem value={6}>
                      {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, { n: 6 })}
                    </MenuItem>
                    <MenuItem value={12}>
                      {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, {
                        n: 12
                      })}
                    </MenuItem>
                    <MenuItem value={24}>
                      {t(res.FILTER_BY_LAST_N_HOURS_LAST_HOURS, {
                        n: 24
                      })}
                    </MenuItem>
                    <MenuItem value={24 * 7}>
                      {t(res.FILTER_BY_LAST_N_HOURS_LAST_1_WEEK)}
                    </MenuItem>
                    <MenuItem value={-1}>
                      {t(res.FILTER_BY_LAST_N_HOURS_ALL_TIME)}
                    </MenuItem>
                  </Select>
                }
              />
              <StackedListItem
                leftPrimaryLabel={t(res.FILTER_BY_DEFAULT_UNL_ONLY)}
                rightComponent={
                  <Switch
                    disabled={isFitleringDisabled}
                    checked={defaultOnly}
                  />
                }
                onClick={e =>
                  !isFitleringDisabled &&
                  onApplyFilter("defaultOnly", !defaultOnly)
                }
              />
              <StackedListItem
                leftPrimaryLabel={t(res.FILTER_BY_VERIFIED_DOMAINS_ONLY)}
                rightComponent={
                  <Switch
                    disabled={isFitleringDisabled}
                    checked={verifiedOnly}
                  />
                }
                onClick={e =>
                  !isFitleringDisabled &&
                  onApplyFilter("verifiedOnly", !verifiedOnly)
                }
              />
              <StackedListItem
                leftPrimaryLabel={t(res.FILTER_BY_MAIN_NET_ONLY)}
                rightComponent={
                  <Switch
                    disabled={isFitleringDisabled}
                    checked={mainNetOnly}
                  />
                }
                onClick={e =>
                  !isFitleringDisabled &&
                  onApplyFilter("mainNetOnly", !mainNetOnly)
                }
              />
            </GenericList>
          </div>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth()(FilterButton));
