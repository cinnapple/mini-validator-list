import * as React from "react";
import { Drawer as _Drawer } from "antd";
import { Sizes } from "../types";
import withSize from "../hoc/withSize";

interface Props {
  open: boolean;
  onClose: () => void;
  size: Sizes;
}

const Drawer: React.SFC<Props> = ({ children, open, onClose, size }) => {
  return (
    <_Drawer
      width={size === Sizes.Mobile ? "100%" : 640}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={open}
    >
      {children}
    </_Drawer>
  );
};

export default withSize(Drawer);
