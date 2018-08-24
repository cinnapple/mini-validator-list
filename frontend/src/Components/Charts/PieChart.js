import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import { Pie } from "@vx/shape";
import { Group } from "@vx/group";
import { localPoint } from "@vx/event";
import { withTooltip, Tooltip } from "@vx/tooltip";
import { scaleOrdinal } from "@vx/scale";
import { LegendOrdinal } from "@vx/legend";

import { _palette } from "../../util/colors";

const styles = theme => ({
  tooltip: {
    color: theme.palette.primary.contrastText
  },
  legend: {
    color: theme.palette.primary.contrastText
  }
});

const formattedY = d => (d.y * 100).toFixed(1) + "%";

class PieChart extends React.Component {
  state = {
    margin: {
      top: 150
    },
    innerWidth: 0,
    innerHeight: 0
  };

  constructor(props) {
    super(props);
    this.pieChart = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize = () => {
    this.setState({
      innerWidth: this.pieChart.current ? this.pieChart.current.offsetWidth : 0,
      innerHeight: this.pieChart.current
        ? this.pieChart.current.offsetHeight
        : 0
    });
  };

  handleTooltip({ event, data }) {
    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);
    showTooltip({
      tooltipData: data,
      tooltipLeft: x,
      tooltipTop: y
    });
  }

  render() {
    const {
      height,
      data,
      centerText,
      color,
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip
    } = this.props;
    const { innerWidth, innerHeight, margin } = this.state;

    const radius = height / 2 - 20;
    const innerRadius = radius - 50;
    const center = innerWidth / 2;
    const colorRange = _palette.gradient2(color);

    const zScale = scaleOrdinal({
      domain: data.map(a => a.x),
      range: colorRange
    });

    const centerTooltipWidth = innerRadius;
    const centerTooltipHeight = innerRadius;

    return (
      <div ref={this.pieChart} style={{ position: "relative" }}>
        <svg width={innerWidth} height={height}>
          <Group top={margin.top} left={center}>
            <Pie
              data={data}
              pieValue={d => d.y}
              outerRadius={radius}
              innerRadius={innerRadius}
              padAngle={0}
              fill={d => colorRange[d.index]}
              onMouseLeave={data => event => {
                hideTooltip();
              }}
              onMouseMove={data => event =>
                this.handleTooltip({
                  event,
                  data
                })}
            />
          </Group>
        </svg>
        {centerText && (
          <Tooltip
            top={innerHeight / 2 - centerTooltipHeight}
            left={center - centerTooltipWidth}
            style={{
              boxShadow: "none",
              textAlign: "center",
              verticalAlign: "middle",
              width: centerTooltipWidth * 2,
              height: centerTooltipHeight * 2,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div>{centerText}</div>
          </Tooltip>
        )}
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
                {tooltipData.data.x}
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                {formattedY(tooltipData.data)}
              </Typography>
            </div>
          </Tooltip>
        )}
        <Typography
          component="div"
          style={{
            position: "absolute",
            top: height,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px"
          }}
        >
          <LegendOrdinal
            scale={zScale}
            direction="row"
            labelMargin="0 15px 0 0"
            labelFormat={(d, i) => {
              return `${d}`;
            }}
          />
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withTooltip(PieChart));
