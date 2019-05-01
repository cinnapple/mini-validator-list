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
import UnlAnalysisContainer from "./containers/UNLAnalysis";
import ValidatorDetailsContainer from "./containers/ValidatorDetails";

const withSize = (Component: any) => (
  <>
    <MobileSize>
      <Component {...{ size: Sizes.Mobile }} />
    </MobileSize>
    <TabletSize>
      <Component {...{ size: Sizes.Tablet }} />
    </TabletSize>
    <DesktopSize>
      <Component {...{ size: Sizes.Desktop }} />
    </DesktopSize>
  </>
);

const DashboardPage = () => withSize(DashboardContainer);
const ValidatorListPage = () => withSize(ValidatorListContainer);
const ValidatorDetailsPage = () => withSize(ValidatorDetailsContainer);
const UnlAnalysisPage = () => withSize(UnlAnalysisContainer);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route path={`/validators/:id`} component={ValidatorDetailsPage} />
          <Route exact path="/validators" component={ValidatorListPage} />
          <Route exact path="/unl-analysis" component={UnlAnalysisPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
