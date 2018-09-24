import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import BrowserRouter from "react-router-dom/es/BrowserRouter";

import appReducer from "./store/reducers/appReducer";
import notificationReducer from "./store/reducers/notificationReducer";
import validatorReducer from "./store/reducers/validatorReducer";
import defaultUnlReducer from "./store/reducers/defaultUnlReducer";
import summaryReducer from "./store/reducers/summaryReducer";
import selectDialogReducer from "./store/reducers/selectDialogReducer";

import App from "./App";
import { webClient } from "./services/webClient";

const rootReducer = combineReducers({
  app: appReducer,
  notification: notificationReducer,
  selectDialog: selectDialogReducer,
  validators: validatorReducer,
  unl: defaultUnlReducer,
  summary: summaryReducer
});

let composeEnhancers = compose;
let applyTheseMiddleware = undefined;

if (process.env["NODE_ENV"] === "development") {
  composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  applyTheseMiddleware = applyMiddleware(
    require("./loggerMiddleware").logger,
    thunk.withExtraArgument(webClient)
  );
} else {
  applyTheseMiddleware = applyMiddleware(thunk.withExtraArgument(webClient));
}

const store = createStore(rootReducer, composeEnhancers(applyTheseMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#app")
);
