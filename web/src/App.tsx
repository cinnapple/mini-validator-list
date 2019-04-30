import * as React from "react";
import { MobileSize, DesktopSize, TabletSize } from "./components/Responsive";
import { Sizes } from "./types";
import { BrowserRouter as Router, Route } from "react-router-dom";

import DashboardContainer from "./containers/Dashboard";
import ValidatorListContainer from "./containers/ValidatorList";
import UnlAnalysisContainer from "./containers/UNLAnalysis";

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
const UnlAnalysisPage = () => withSize(UnlAnalysisContainer);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/validators" component={ValidatorListPage} />
        <Route exact path="/unl-analysis" component={UnlAnalysisPage} />
      </div>
    </Router>
  );
};

export default App;
