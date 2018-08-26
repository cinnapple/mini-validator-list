import React from "react";
import * as topojson from "topojson-client";

import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";

import { Mercator } from "@vx/geo";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";

import { _palette, _gradients } from "../../util/colors";

const topology = require("./world-topo.json");
const world = topojson.feature(topology, topology.objects.countries1);

const styles = theme => ({
  tooltip: {
    color: theme.palette.primary.contrastText
  },
  legend: {
    color: theme.palette.primary.contrastText
  }
});

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: 0
    };
    this.chart = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize = () => {
    this.setState({
      innerWidth: this.chart.current ? this.chart.current.offsetWidth : 0
    });
  };

  handleTooltip({ event, data }) {
    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);
    if (data.item) {
      showTooltip({
        tooltipData: data.item,
        tooltipLeft: x,
        tooltipTop: y
      });
    }
  }

  render() {
    const {
      data,
      color,
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip
    } = this.props;
    const { innerWidth } = this.state;

    const gradients = _gradients(color, data, 0.6);

    return (
      <div ref={this.chart} style={{ position: "relative" }}>
        <svg width={innerWidth} height={innerWidth / 1.75}>
          <Mercator
            data={world.features}
            scale={(innerWidth / 630) * 100}
            translate={[innerWidth / 2, innerWidth / 2.75]}
            fill={d => {
              const cd = d.properties["Alpha-2"];
              const result = data.findIndex(a => a.country_code === cd);
              if (result > -1) {
                d.item = data[result];
                return gradients[result];
              }
              return _palette.black;
            }}
            onMouseLeave={data => event => {
              hideTooltip();
            }}
            onMouseMove={data => event =>
              this.handleTooltip({
                event,
                data
              })}
            stroke={() => _palette.darker(color)}
          />
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop + 10}
            left={tooltipLeft + 10}
            style={{
              minWidth: 60,
              zIndex: 9999,
              backgroundColor: "rgba(0,0,0,0.9)",
              color: "white"
            }}
          >
            <div>
              <Typography variant="body1" style={{ color: "#fff" }}>
                {tooltipData.country_name}
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                {`${tooltipData.count} validators`}
              </Typography>
            </div>
          </Tooltip>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withTooltip(MapChart));
