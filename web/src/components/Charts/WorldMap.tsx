import * as React from "react";
import { IChartPropBase, IWorldMapOptions, Sizes } from "../../types";
import { Typography } from "antd";
import { icon } from "leaflet";
import { Map, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./worldmap.css";
import "react-leaflet-fullscreen-control";
import withSize from "../../hoc/withSize";
const { Text, Paragraph } = Typography;

/**
 * https://leaflet-extras.github.io/leaflet-providers/preview/index.html
 */
const TILE_PROVIDER: any = {
  url:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
};

interface State {
  center: [number, number];
  zoom: number;
}

const WorldMap: React.SFC<IChartPropBase<IWorldMapOptions>> = ({
  size,
  dataSet,
  queryItem
}) => {
  const { options } = queryItem;
  const { props } = options;
  const [state, setState] = React.useState<State>({
    center: [30, 0],
    zoom: 1
  });
  const { center, zoom } = state;
  return (
    <Map
      fullscreenControl
      center={center as any}
      zoom={zoom}
      maxZoom={6}
      style={{ height: 400 }}
    >
      <TileLayer
        attribution={TILE_PROVIDER.attribution}
        url={TILE_PROVIDER.url}
      />
      <MarkerClusterGroup
        maxClusterRadius={40}
        spiderfyDistanceMultiplier={1.2}
        showCoverageOnHover={false}
        spiderfyOnMaxZoom={true}
        spiderLegPolylineOptions={{ weight: 1.5, color: "#000", opacity: 0.5 }}
      >
        {dataSet.map((domain: any) => (
          <Marker
            key={domain[props.domainField]}
            position={[
              domain[props.latitudeField],
              domain[props.longitudeField]
            ]}
            icon={icon({
              className: "leaflet-icon",
              iconUrl: domain[props.iconField]
                ? `data:image/png;base64, ${domain[props.iconField]}`
                : `default-map-icon.png`,
              iconSize: domain[props.iconField] ? [40, 40] : [30, 30]
            })}
          >
            <Popup offset={[0, -25]}>
              <Typography>
                <Text strong>{domain[props.domainField]}</Text>
                <Paragraph>
                  {domain[props.cityField]
                    ? `${domain[props.cityField]}, `
                    : ``}
                  {domain[props.countryNameField]}
                </Paragraph>
              </Typography>
            </Popup>
            {size === Sizes.Desktop ? (
              <Tooltip direction="bottom" offset={[0, 25]}>
                <Typography>
                  <Text strong>{domain[props.domainField]}</Text>
                  <Paragraph>
                    {domain[props.cityField]
                      ? `${domain[props.cityField]}, `
                      : ``}
                    {domain[props.countryNameField]}
                  </Paragraph>
                </Typography>
              </Tooltip>
            ) : null}
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  );
};

export default withSize(WorldMap);
