import React from "react";

let pendingRequestCount = 0;

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      isLoading: false
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        pendingRequestCount++;
        if (pendingRequestCount > 0 && !this.state.isLoading) {
          this.setState({
            isLoading: true
          });
        }
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => {
          pendingRequestCount--;
          setTimeout(() => {
            if (pendingRequestCount === 0 && this.state.isLoading) {
              this.setState({
                isLoading: false
              });
            }
          }, 200);
          return res;
        },
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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
