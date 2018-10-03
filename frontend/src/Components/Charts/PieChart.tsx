import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import Pie from "@vx/shape/build/shapes/Pie";
import Group from "@vx/group/build/Group";
import localPoint from "@vx/event/build/localPoint";
import { withTooltip, Tooltip } from "@vx/tooltip";
import scaleOrdinal from "@vx/scale/build/scales/ordinal";
import LegendOrdinal from "@vx/legend/build/legends/Ordinal";

import { _palette } from "../../util/colors";

import ChartBase from "./ChartBase";

const styles = theme =>
  createStyles({
    tooltip: {
      color: theme.palette.primary.contrastText
    },
    legend: {
      color: theme.palette.primary.contrastText
    }
  });

const formattedY = d => (d.y * 100).toFixed(1) + "%";

type Props = {
  height: number;
  centerText: any;
  data: any[];
  showTooltip: Function;
  color: string;
  tooltipOpen: boolean;
  tooltipLeft: number;
  tooltipTop: number;
  tooltipData: any;
  hideTooltip: Function;
} & WithStyles<any>;

class PieChart extends ChartBase<Props> {
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
    const { innerWidth, innerHeight } = this.state;

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
      <div ref={this.chart} style={{ position: "relative" }}>
        <svg width={innerWidth} height={height}>
          <Group top={150} left={center}>
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

export default withStyles(styles, { withTheme: true })(
  withTooltip(PieChart)
) as any;
