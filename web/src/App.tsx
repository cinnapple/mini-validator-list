import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";

const App = () => {
  return (
    <Router>
      <LayoutComponent>
        <Switch>
          <Route
            exact
            path="/"
            component={React.lazy(() => import("./containers/Dashboard"))}
          />
          <Route
            exact
            path="/validators"
            component={React.lazy(() => import("./containers/ValidatorList"))}
          />
          <Route
            exact
            path="/unl-scoreboard"
            component={React.lazy(() => import("./containers/UNLScoreboard"))}
          />
          <Route
            path={`/validators/:id`}
            component={React.lazy(() =>
              import("./containers/ValidatorDetails")
            )}
          />
          <Redirect to="/" />
        </Switch>
      </LayoutComponent>
    </Router>
  );
};

export default App;
