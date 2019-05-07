import * as React from "react";
import { MobileSize, DesktopSize, TabletSize } from "./components/Responsive";
import { Sizes } from "./types";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import DashboardContainer from "./containers/Dashboard";
import ValidatorListContainer from "./containers/ValidatorList";
import UNLScoreboardContainer from "./containers/UNLScoreboard";
import ValidatorDetailsContainer from "./containers/ValidatorDetails";

const withSize = (Component: any, props: any) => (
  <>
    <MobileSize>
      <Component {...props} {...{ size: Sizes.Mobile }} />
    </MobileSize>
    <TabletSize>
      <Component {...props} {...{ size: Sizes.Tablet }} />
    </TabletSize>
    <DesktopSize>
      <Component {...props} {...{ size: Sizes.Desktop }} />
    </DesktopSize>
  </>
);

const DashboardPage = (props: any) => withSize(DashboardContainer, props);
const ValidatorListPage = (props: any) =>
  withSize(ValidatorListContainer, props);
const ValidatorDetailsPage = (props: any) =>
  withSize(ValidatorDetailsContainer, props);
const UNLScoreboardPage = (props: any) =>
  withSize(UNLScoreboardContainer, props);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route path={`/validators/:id`} component={ValidatorDetailsPage} />
          <Route exact path="/validators" component={ValidatorListPage} />
          <Route exact path="/unl-scoreboard" component={UNLScoreboardPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
