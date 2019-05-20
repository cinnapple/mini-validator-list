import * as React from "react";
import { Drawer as AntdDrawer } from "antd";
import { Sizes } from "../types";
import withSize, { SizeProps } from "../hoc/withSize";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{}>, SizeProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.SFC<Props> = ({ children, open, onClose, size }) => {
  return (
    <AntdDrawer
      width={size === Sizes.Mobile ? "100%" : 640}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={open}
    >
      {children}
    </AntdDrawer>
  );
};

export default withRouter(withSize(Drawer));
