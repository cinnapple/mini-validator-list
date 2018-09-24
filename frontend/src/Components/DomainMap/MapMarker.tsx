const { Icon } = (window as any).L;

const iconUrlBase = "/static/marker-icon-2x-XXX.png";
const shadowIconUrl = "/static/marker-shadow.png";
const icons = {
  ripple: {
    url: iconUrlBase.replace("XXX", "blue"),
    shadowUrl: shadowIconUrl,
    size: [25, 41]
  },
  default: {
    url: iconUrlBase.replace("XXX", "yellow"),
    shadowUrl: shadowIconUrl,
    size: [25, 41]
  },
  verified: {
    url: iconUrlBase.replace("XXX", "grey"),
    shadowUrl: shadowIconUrl,
    size: [25, 41]
  }
};

const createMarker = type =>
  new Icon({
    iconUrl: icons[type].url,
    shadowUrl: icons[type].shadowUrl,
    iconSize: icons[type].size,
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
    tooltipAnchor: [15, -30]
  });

const rippleMarker = createMarker("ripple");
const defaultMarker = createMarker("default");
const verifiedMarker = createMarker("verified");

const getMarkerForValidator = v => {
  if (v.is_ripple) {
    return rippleMarker;
  } else if (v.default) {
    return defaultMarker;
  }
  return verifiedMarker;
};

export { getMarkerForValidator };
