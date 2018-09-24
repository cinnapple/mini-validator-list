import * as React from "react";

type Props = { to: string; amount: number; size: number; network: string };

export default class XRPTipBotButton extends React.Component<Props, any> {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.xrptipbot.com/static/donate/tipper.js";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    const { to, amount, size, network } = this.props;

    return (
      <a
        {...{
          amount: amount,
          size: size || 275,
          to: to,
          network: network
        }}
        href="https://www.xrptipbot.com"
        target="_blank"
      />
    );
  }
}
