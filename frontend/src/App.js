import React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "./store/actions/index";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";
import withRouter from "react-router-dom/es/withRouter";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";

import { t, res } from "./services/i18nService";
import Layout from "./hoc/Layout/Layout";

import OverviewContainer from "./containers/Overview/OverviewContainer";
import ValidatorsContainer from "./containers/Validators/ValidatorsContainer";
import SettingsContainer from "./containers/Settings/SettingsContainer";
import SelectDialogContainer from "./containers/Common/SelectDialogContainer";
import NetworkProgressContainer from "./containers/Common/NetworkProgressContainer";

const createDynamicMuiTheme = type => {
  return createMuiTheme({
    palette: {
      type: type,
      primary: {
        main: type === "dark" ? "#303030" : "#2C3E50"
      },
      secondary: {
        main: "#18BC9C"
      }
    },
    typography: {
      fontFamily: ["'Roboto'", "sans-serif"].join(",")
    },
    drawerWidth: 250
  });
};

class App extends React.Component {
  render() {
    const { app, location, onChangeLanguage, onDialogOpen } = this.props;

    const routes = (
      <Switch>
        <Route exact path="/" component={() => <OverviewContainer />} />
        <Route exact path="/validators" component={() => <ValidatorsContainer />} />
        <Route exact path="/settings" component={() => <SettingsContainer />} />
        <Redirect from="*" to="/" />
      </Switch>
    );

    return (
      <MuiThemeProvider theme={createDynamicMuiTheme(app.themeType)}>
        <CssBaseline />
        <NetworkProgressContainer />
        <Layout
          app={app}
          title={t(res.APP_TITLE)}
          pathname={location.pathname}
          onChangeLanguage={onChangeLanguage}
          onDialogOpen={onDialogOpen}
        >
          {routes}
        </Layout>
        <SelectDialogContainer />
        {/* <NotificationContainer /> */}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeLanguage: lang => dispatch(actions.setLanguage(lang)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(
        actions.openDialog({
          title,
          items,
          handleSelect,
          selectedValue
        })
      )
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
