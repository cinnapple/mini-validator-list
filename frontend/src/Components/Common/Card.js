import React from "react";
import Link from "react-router-dom/es/Link";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronRight from "@material-ui/icons/ChevronRightRounded";

import Tabs from "./Tabs";
import Figures from "./Figures";

const cancelPadding = {
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  "&:last-child": {
    paddingBottom: "0px"
  }
};

const height = 370;

const styles = theme => ({
  card: {
    minWidth: 275
  },
  cardContentTabRoot: {
    backgroundColor: theme.palette.background.paper
  },
  mainCardContentRoot: { ...cancelPadding },
  cardContentRootSecond: {
    ...cancelPadding,
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      minHeight: height
    },
    [theme.breakpoints.up("sm")]: {
      overflowY: "auto",
      height: height
    }
  },
  cardContentRootSecondWithFixedContent: {
    ...cancelPadding,
    overflowX: "hidden",
    minHeight: height - 100,
    [theme.breakpoints.up("sm")]: {
      overflowY: "auto",
      maxHeight: height - 100
    }
  },
  cardContentDisclaimer: {
    ...cancelPadding,
    position: "absolute",
    bottom: 0
  },
  cardActionRoot: {
    textAlign: "right",
    display: "block"
  },
  button: {},
  rightIcon: {
    // marginLeft: theme.spacing.unit * 0.5
  }
});

class MyCard extends React.Component {
  constructor(props) {
    super(props);
    const { card } = this.props;
    this.state = {
      selectedTab: card.initialTabIndex || 0
    };
  }

  handleTabChange = selectedTab => {
    this.setState({ selectedTab });
  };

  render() {
    const { classes, theme, title, card, height, disclaimer } = this.props;
    const { selectedTab } = this.state;

    const hasFixedContent =
      card.fixedContent ||
      (card.isTabbed && card.data[selectedTab].fixedContent);

    let footerElement = <React.Fragment />;
    if (card.actionLink) {
      footerElement = (
        <React.Fragment>
          <Divider />
          <CardActions classes={{ root: classes.cardActionRoot }}>
            <Button
              to={card.actionLink}
              component={Link}
              color="secondary"
              className={classes.button}
              size="small"
            >
              {card.actionLinkText}
              <ChevronRight className={classes.rightIcon} />
            </Button>
          </CardActions>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Typography variant="title" style={{ marginBottom: "1rem" }}>
          {title}
        </Typography>
        <Card className={classes.card}>
          {card.isTabbed && (
            <CardContent classes={{ root: classes.mainCardContentRoot }}>
              <div className={classes.cardContentTabRoot}>
                <Tabs
                  selectedTab={selectedTab}
                  onTabChange={this.handleTabChange}
                  data={card.data}
                />
              </div>
            </CardContent>
          )}
          {!card.isTabbed && (
            <CardContent classes={{ root: classes.mainCardContentRoot }}>
              <div className={classes.cardContentTabRoot}>
                <Figures data={card.data} />
              </div>
            </CardContent>
          )}
          {hasFixedContent && (
            <React.Fragment>
              <CardContent classes={{ root: classes.mainCardContentRoot }}>
                {card.fixedContent || card.data[selectedTab].fixedContent}
              </CardContent>
              <CardContent
                classes={{
                  root: classes.cardContentRootSecondWithFixedContent
                }}
                style={{ height: height }}
              >
                {card.isTabbed ? card.data[selectedTab].content : card.content}
              </CardContent>
            </React.Fragment>
          )}
          {!hasFixedContent && (
            <CardContent
              classes={{
                root: classes.cardContentRootSecond
              }}
            >
              {card.isTabbed ? card.data[selectedTab].content : card.content}
            </CardContent>
          )}
          {footerElement}
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MyCard);
