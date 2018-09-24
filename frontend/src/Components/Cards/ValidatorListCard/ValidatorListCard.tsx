import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import ContentLoader from "react-content-loader";

import Paper from "@material-ui/core/Paper";

import Table from "../../../components/ValidatorList/Table";

const styles = theme =>
  createStyles({
    wrapper: {
      width: "100%"
    }
  });

const Loader = props => (
  <div style={{ padding: "1rem" }}>
    <ContentLoader
      speed={2}
      height={250}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <rect x="0" y="25" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="55" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="85" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="115" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="145" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="175" rx="0" ry="5" width="100%" height="5" />
      <rect x="0" y="205" rx="0" ry="5" width="100%" height="5" />
    </ContentLoader>
  </div>
);

const ValidatorList = ({ classes, vals, isLoading }) => {
  let content = Loader(this.props);
  if (!isLoading && vals.filtered) {
    content = <Table list={vals.filtered} />;
  }

  return (
    <div className={classes.wrapper} key="ValidatorList">
      <Paper>{content}</Paper>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ValidatorList);
