import * as React from "react";

interface Props {
  to: string;
  label?: string;
  labelpt?: string;
  amount: string;
  size?: string;
  network: string;
  stylesheet?: string;
}

const appendScript = () => {
  const script = document.createElement("script");
  script.src = "https://www.xrptipbot.com/static/donate/tipper.js";
  script.charset = "utf-8";
  script.async = true;
  document.body.appendChild(script);
};

const XRPTipBotButton = React.memo<Props>(
  ({ to, amount, label, labelpt, size = "275", network, stylesheet }) => {
    React.useEffect(appendScript, []);
    return (
      <a
        {...{
          amount,
          label,
          labelpt,
          size,
          to,
          network,
          stylesheet
        }}
        href="https://www.xrptipbot.com"
        target="_blank"
      />
    );
  }
);

export default XRPTipBotButton;
