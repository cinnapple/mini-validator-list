import * as React from "react";
import ContentLoader from "react-content-loader";

const Loader = props => (
  <ContentLoader
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    preserveAspectRatio="xMidYMid slice"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="230" />
  </ContentLoader>
);

export default Loader;
