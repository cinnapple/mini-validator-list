import * as React from "react";

interface Props {
  to: string;
  amount: string;
  size?: string;
  network: string;
}

const XRPTipBotButton = React.memo<Props>(({ to, amount, size, network }) => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.xrptipbot.com/static/donate/tipper.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  });
  return (
    <a
      {...{
        amount,
        size: size || "275",
        to,
        network
      }}
      href="https://www.xrptipbot.com"
      target="_blank"
    />
  );
});

export default XRPTipBotButton;
