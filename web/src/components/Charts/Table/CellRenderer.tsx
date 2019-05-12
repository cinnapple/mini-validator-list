import * as React from "react";
import { Badge, Tag } from "antd";
import { IExtendedColumnProps } from "../../../types";
import { parseUnlHost } from "../../../helpers/util";

const unlTagColors: { [key: string]: string } = {
  "vl.ripple.com": "#108ee9"
};

const getStaus = (relativeHours: number) => {
  if (relativeHours >= 24) {
    return <Badge status="error" />;
  } else if (relativeHours >= 1) {
    return <Badge status="warning" />;
  }
  return <Badge status="processing" color="#1DA57A" />;
};

const keyRenderer = () => (text: string) => {
  return `${text.substr(0, 10)}...`;
};

const shortDateRenderer = () => (relativeHours: number) => {
  if (relativeHours >= 24) {
    return `${(relativeHours / 24).toFixed(0)} days ago`;
  }
  if (relativeHours >= 1) {
    return `${relativeHours.toFixed(0)} hours ago`;
  }
  return "Just now";
};

const scoreRenderer = () => (score: number) => {
  return score.toFixed(4);
};

const unlsRenderer = () => (unls: string) => {
  if (unls) {
    const hosts = unls.split(";").map(unl => parseUnlHost(unl));
    return (
      <>
        {hosts.map((host, i) => (
          <Tag key={i} color={unlTagColors[host]}>
            {host}
          </Tag>
        ))}
      </>
    );
  }
  return "";
};

const domainRenderer = (
  c: IExtendedColumnProps<any>,
  onDrilldown: (opt: any) => void
) => (domain: string, rec: any) => (
  <>
    {getStaus(rec[c.domainRenderOptions!.relativeHoursField])}
    {
      <a
        onClick={() =>
          c.domainRenderOptions ? onDrilldown({ selected: rec }) : undefined
        }
      >
        {domain ? (
          domain
        ) : c.domainRenderOptions ? (
          <code style={{ fontSize: "smaller" }}>
            {rec[c.domainRenderOptions.textField]}
          </code>
        ) : (
          ""
        )}
      </a>
    }
  </>
);

const defaultRenderer = () => (value: any) => {
  return value;
};

const getCellRenderer = (
  c: IExtendedColumnProps<any>,
  onDrilldown?: (opt: any) => void
) => {
  if (c.type === "key") {
    return keyRenderer();
  }
  if (c.type === "shortdate") {
    return shortDateRenderer();
  }
  if (c.type === "score") {
    return scoreRenderer();
  }
  if (c.type === "unls") {
    return unlsRenderer();
  }
  if (c.type === "domain") {
    return domainRenderer(c, onDrilldown!);
  }
  return defaultRenderer();
};

export { getCellRenderer };
