import * as React from "react";
import { Card } from "antd";
import { Map, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import { IChartPropBase, IMapProps } from "../../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

/**
 * https://leaflet-extras.github.io/leaflet-providers/preview/index.html
 */
const TILE_PROVIDER: any = {
  light: {
    url:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  dark: {
    url:
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }
};

interface State {
  center: [number, number];
  zoom: number;
}

const WorldMap: React.SFC<IChartPropBase<IMapProps>> = ({ dataSet }) => {
  const [state, setState] = React.useState<State>({
    center: [30, 0],
    zoom: 1
  });
  const { center, zoom } = state;
  const themeType = "light";
  return (
    <Map
      center={center as any}
      zoom={zoom}
      maxZoom={50}
      style={{ height: 400 }}
    >
      <TileLayer
        attribution={TILE_PROVIDER[themeType].attribution}
        url={TILE_PROVIDER[themeType].url}
      />
      <MarkerClusterGroup showCoverageOnHover={false} spiderfyOnMaxZoom={true}>
        {dataSet.map((domain: any) => (
          <Marker
            key={domain["GeoLocation.domain"]}
            position={[
              domain["GeoLocation.latitude"],
              domain["GeoLocation.longitude"]
            ]}
          >
            <Tooltip direction="bottom" offset={[0, 0]} permanent>
              <Popup>
                <Card
                  size="small"
                  title={domain["GeoLocation.domain"]}
                  bordered={false}
                  extra={<a href="#">More</a>}
                  style={{ width: 300 }}
                >
                  <p>{domain["GeoLocation.city"]}</p>
                </Card>
              </Popup>
              <div>{domain["GeoLocation.domain"]}</div>
            </Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  );
};

export default WorldMap;
