import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import "leaflet";
import { Map, TileLayer, Marker, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import { getMarkerForValidator } from "./MapMarker";

const styles = theme =>
  createStyles({
    popup: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary,
      fontSize: "1rem",
      fontFamily: theme.typography.fontFamily
    },
    chip: {
      margin: theme.spacing.unit,
      marginLeft: 0,
      marginBottom: 0
    }
  });

// refer: https://leaflet-extras.github.io/leaflet-providers/preview/index.html
const TILE_PROVIDER = {
  light: {
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  },
  dark: {
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }
};

const getRegionText = domain => {
  let text;
  if (domain.region_name) {
    text = `${domain.region_name}, ${domain.country_name}`;
  } else if (domain.country_name) {
    text = `${domain.country_name}`;
  }
  return <span key={text}>{text || "Unknown location"}</span>;
};

const getDomainDescription = domain => {
  return (
    <span>
      <span>{domain.domain}</span>
      <br />
    </span>
  );
};

class MyMap extends React.Component<any, any> {
  state = {
    center: [30, 0],
    zoom: 1
  };

  componentWillReceiveProps(props) {
    if (this.props.selectedDomain !== props.selectedDomain) {
      const domain = this.props.domains.filter(
        a => a.domain === props.selectedDomain
      )[0];
      this.setState({
        center: [domain.latitude, domain.longitude],
        zoom: 4
      });
    }
  }

  render() {
    const { classes, domains, themeType, height } = this.props;
    const { center, zoom } = this.state;
    return (
      <Map
        center={center}
        zoom={zoom}
        fullscreenControl
        maxZoom={6}
        style={{ height: height }}
      >
        <TileLayer
          attribution={TILE_PROVIDER[themeType].attribution}
          url={TILE_PROVIDER[themeType].url}
        />
        {domains && (
          <MarkerClusterGroup
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={true}
          >
            {domains
              .filter(d => d.domain && !!d.latitude && !!d.longitude)
              .map((domain, i) => {
                return (
                  <Marker
                    key={domain.domain}
                    position={[domain.latitude, domain.longitude]}
                    icon={getMarkerForValidator(domain)}
                  >
                    <Tooltip
                      className={classes.popup}
                      sticky
                      direction="right"
                      offset={[15, 0]}
                    >
                      <Typography variant="title">
                        {getDomainDescription(domain)}
                      </Typography>
                      <Typography variant="subheading">
                        {getRegionText(domain)}
                      </Typography>
                      {(domain.is_ripple || domain.default) && (
                        <Typography variant="caption">
                          {domain.is_ripple && (
                            <Chip label="Ripple" className={classes.chip} />
                          )}
                          {domain.default && (
                            <Chip
                              label="Default UNL"
                              className={classes.chip}
                            />
                          )}
                        </Typography>
                      )}
                    </Tooltip>
                  </Marker>
                );
              })}
          </MarkerClusterGroup>
        )}
      </Map>
    );
  }
}

export default withStyles(styles)(MyMap);
