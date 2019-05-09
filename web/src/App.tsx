import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";

import {
  HelloRequest,
  HelloReply
} from "minivalist-shared/proto-src/dist/helloworld_pb";
import { GreeterClient } from "minivalist-shared/proto-src/dist/helloworld_grpc_web_pb";
import {
  EchoRequest,
  ServerStreamingEchoRequest
} from "minivalist-shared/proto-src/dist/echo_pb";
import { EchoServiceClient } from "minivalist-shared/proto-src/dist/echo_grpc_web_pb";

var client = new GreeterClient("http://localhost:8080", null, null);
var echoClient = new EchoServiceClient("http://localhost:8080", null, null);

var request = new HelloRequest();
request.setName("World");

client.sayHello(request, {}, (err, response) => {
  if (response) {
    console.log(response.getMessage());
  }
});

var echoRequest = new EchoRequest();
echoRequest.setMessage("echo this message");
echoClient
  .echo(echoRequest, {}, (err, response) => {
    if (response) {
      console.log(response.getMessage());
    }
  })
  .on("status", status => {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });

var streamRequest = new ServerStreamingEchoRequest();
streamRequest.setMessage("hi" + new Date().getMilliseconds());
streamRequest.setMessageCount(50);
streamRequest.setMessageInterval(500);

echoClient
  .serverStreamingEcho(streamRequest, {})
  .on("error", error => {
    console.log(`error: `, error);
  })
  .on("end", () => {
    console.log(`end`);
  })
  .on("data", response => {
    console.log(response.getHash());
    console.log(response.getKey());
  });

const App = () => {
  return (
    <Router>
      <LayoutComponent>
        <Switch>
          <Route
            exact
            path="/"
            component={React.lazy(() =>
              import("./containers/Dashboard/DashboardContainer")
            )}
          />
          <Route
            exact
            path="/validators/:pubkey?"
            component={React.lazy(() =>
              import("./containers/ValidatorList/ValidatorListContainer")
            )}
          />
          <Route
            exact
            path="/unl-scoreboard"
            component={React.lazy(() =>
              import("./containers/UNLScoreboard/UNLScoreboardContainer")
            )}
          />
          <Redirect to="/" />
        </Switch>
      </LayoutComponent>
    </Router>
  );
};

export default App;
