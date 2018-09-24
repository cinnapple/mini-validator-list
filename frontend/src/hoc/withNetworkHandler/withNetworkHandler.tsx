import * as React from "react";
import { webClient } from "../../services/webClient";

let pendingRequestCount = 0;

const withErrorHandler = WrappedComponent => {
  return class extends React.Component<any, any> {
    private reqInterceptor: any;
    private resInterceptor: any;
    state = {
      isLoading: false
    };

    componentWillMount() {
      this.reqInterceptor = webClient.interceptors.request.use(req => {
        pendingRequestCount++;
        if (pendingRequestCount > 0 && !this.state.isLoading) {
          this.setState({
            isLoading: true
          });
        }
        return req;
      });
      this.resInterceptor = webClient.interceptors.response.use(
        res => {
          pendingRequestCount--;
          setImmediate(() => {
            if (pendingRequestCount === 0 && this.state.isLoading) {
              this.setState({
                isLoading: false
              });
            }
          });
          return res;
        },
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      webClient.interceptors.request.eject(this.reqInterceptor);
      webClient.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <WrappedComponent {...this.props} isLoading={this.state.isLoading} />
      );
    }
  };
};

export default withErrorHandler;
