import * as React from "react";
import connect from "react-redux/es/connect/connect";

import MessageSnackbar from "../../components/Common/MessageSnackbar";

class NotificationContainer extends React.Component<any, any> {
  render() {
    const { ntf } = this.props;
    const { variant, message } = ntf;

    return <MessageSnackbar variant={variant}>{message}</MessageSnackbar>;
  }
}

const mapStateToProps = state => {
  return {
    ntf: state.notification
  };
};

export default connect(
  mapStateToProps,
  null
)(NotificationContainer);
