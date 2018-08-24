import React from "react";
import Link from "react-router-dom/es/Link";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

import { t, res } from "../../services/i18nService";
import { links } from "../../menu";

import List from "@material-ui/core/List";
import XRPTipBotButton from "../Common/XRPTipBotButton";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  titleListItem: {},
  titleListItemText: {
    fontFamily: "Pacifico, sans-serif",
    [theme.breakpoints.down("xs")]: {
      fontSize: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "135%"
    }
  },
  link: {},
  nested: {
    paddingLeft: theme.spacing.unit * 5
  },
  bottom: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingBottom: theme.spacing.unit * 5
  }
});

const createListItems = (
  links,
  state,
  handleDrawerToggle,
  handleClick,
  classes,
  i
) => {
  const listItems = [];

  links.forEach((link, index) => {
    const navKey = `nav-${i}-${index}`;
    const isExternal = link.path.startsWith("http");
    if (link.sub) {
      const subNavKey = `sub${navKey}`;
      const subItems = [
        <ListItem key={navKey} button onClick={() => handleClick(subNavKey)}>
          <ListItemText
            disableTypography
            primary={
              <Typography
                className={
                  state.externalLinkOpen[subNavKey] ? classes.link : ""
                }
              >
                {t(link.res)}
              </Typography>
            }
          />
        </ListItem>,
        <Collapse
          key={subNavKey}
          in={state.externalLinkOpen[subNavKey]}
          timeout="auto"
          unmountOnExit
        >
          <List key={subNavKey} component="div" disablePadding>
            {createListItems(
              link.sub,
              state,
              handleDrawerToggle,
              handleClick,
              classes,
              index
            )}
          </List>
        </Collapse>
      ];

      listItems.push(subItems);
    } else {
      listItems.push(
        <ListItem
          key={navKey}
          button
          component={isExternal ? "a" : Link}
          to={link.path}
          href={isExternal ? link.path : undefined}
          target={isExternal ? "_blank" : undefined}
          onClick={isExternal ? undefined : handleDrawerToggle}
          className={i ? classes.nested : ""}
        >
          {location.pathname === link.path ? (
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.link} color={"secondary"}>
                  {t(link.res)}
                </Typography>
              }
            />
          ) : (
            <ListItemText
              disableTypography
              primary={<Typography>{t(link.res)}</Typography>}
            />
          )}
        </ListItem>
      );
    }
  });

  return listItems;
};

class NavigationItems extends React.Component {
  state = { externalLinkOpen: {} };
  handleClick = name => {
    const newProp = {
      ...this.state.externalLinkOpen[name],
      [name]: !this.state.externalLinkOpen[name]
    };
    this.setState(state => ({
      externalLinkOpen: newProp
    }));
  };
  render() {
    const { classes, handleDrawerToggle } = this.props;
    const isProduction = process.env["NODE_ENV"] === "production";

    return (
      <div>
        <List component="div" className={classes.toolbar}>
          <ListItem className={classes.titleListItem}>
            <ListItemText
              disableTypography
              primary={
                <Typography className={classes.titleListItemText}>
                  {t(res.APP_TITLE)}
                </Typography>
              }
            />
          </ListItem>
          <Divider />
          {createListItems(
            links,
            this.state,
            handleDrawerToggle,
            this.handleClick,
            classes,
            ""
          )}
        </List>
        {isProduction && (
          <List component="div" disablePadding className={classes.bottom}>
            <ListItem>
              <ListItemText
                primary={
                  <XRPTipBotButton
                    network="twitter"
                    to="CinnappleFun"
                    size={215}
                    amount={0.2}
                  />
                }
              />
            </ListItem>
          </List>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(NavigationItems);
