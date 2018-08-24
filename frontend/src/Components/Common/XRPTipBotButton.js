import React from "react";
import PropTypes from "prop-types";

export default class XRPTipBotButton extends React.Component {
  state = {
    ready: false
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.xrptipbot.com/static/donate/tipper.js";
    script.async = true;
    document.body.appendChild(script);

    this.setState({
      ready: true
    });
  }

  render() {
    const { to, amount, size, network } = this.props;

    return (
      <a
        amount={amount}
        size={size || 275}
        to={to}
        network={network}
        href="https://www.xrptipbot.com"
        target="_blank"
      />
    );
  }
}

XRPTipBotButton.propTypes = {
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  network: PropTypes.string.isRequired
};
