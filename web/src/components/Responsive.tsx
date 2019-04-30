import * as React from "react";
import Responsive from "react-responsive";

const DesktopSize = (props: any) => <Responsive {...props} minWidth={992} />;
const TabletSize = (props: any) => (
  <Responsive {...props} minWidth={768} maxWidth={991} />
);
const MobileSize = (props: any) => <Responsive {...props} maxWidth={767} />;
const DefaultSize = (props: any) => <Responsive {...props} minWidth={768} />;

export { DesktopSize, TabletSize, MobileSize, DefaultSize };
