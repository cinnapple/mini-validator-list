import * as React from "react";
import { MobileSize, DesktopSize, TabletSize } from "../components/Responsive";
import { Sizes } from "../types";

export interface SizeProps {
  size: Sizes;
}

const withSize = (WrappedComponent: any) => {
  return (props: any) => (
    <>
      <MobileSize>
        <WrappedComponent {...{ ...props, size: Sizes.Mobile }} />
      </MobileSize>
      <TabletSize>
        <WrappedComponent {...{ ...props, size: Sizes.Tablet }} />
      </TabletSize>
      <DesktopSize>
        <WrappedComponent {...{ ...props, size: Sizes.Desktop }} />
      </DesktopSize>
    </>
  );
};

export default withSize;
