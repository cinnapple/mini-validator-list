import * as React from "react";
import { withStyles, createStyles, WithStyles } from "@material-ui/core";

import localPoint from "@vx/event/build/localPoint";
import { withTooltip, Tooltip } from "@vx/tooltip";
import LegendOrdinal from "@vx/legend/build/legends/Ordinal";
import { BarStack } from "@vx/shape";
import { Grid } from "@vx/grid";
import { AxisBottom } from "@vx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { timeParse, timeFormat } from "d3-time-format";
import { max } from "d3-array";

import Typography from "@material-ui/core/Typography";

import { _palette } from "../../util/colors";

import ChartBase from "./ChartBase";

const parseDate = timeParse("%Y_%m");
const format = timeFormat("%b, %Y");
const formatDate = date => format(parseDate(date));

// accessors
const x = d => d.date;
const keys = ["nonRipple", "ripple"];
const labelMap = { nonRipple: "Non-Ripple", ripple: "Ripple" };
const colorRange = _palette.gradient2("green");

const styles = theme =>
  createStyles({
    tooltip: {
      color: theme.palette.primary.contrastText
    },
    legend: {
      color: theme.palette.primary.contrastText
    }
  });

type Props = {
  height: number;
  data: any[];
  showTooltip: Function;
  color: string;
  tooltipOpen: boolean;
  tooltipLeft: number;
  tooltipTop: number;
  tooltipData: any;
  hideTooltip: Function;
} & WithStyles<any>;

class StackBarChart extends ChartBase<Props> {
  handleTooltip({ event, data, xScale }) {
    const { showTooltip } = this.props;
    const { x, y } = localPoint(event);
    const factor =
      this.state.innerWidth - x < this.state.innerWidth / 3 ? -1 : 1;
    const left =
      xScale(data.x) +
      factor * (data.width + (data.paddingInner * data.step) / 2) +
      (factor < 0
        ? (-3 / 2) * data.width - (data.paddingInner * data.step) / 2
        : 0);
    showTooltip({
      tooltipData: data,
      tooltipLeft: left,
      tooltipTop: y
    });
  }

  render() {
    const {
      data,
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      hideTooltip,
      theme
    } = this.props;
    const { innerWidth } = this.state;

    // data
    const totals = data.reduce((ret, cur) => {
      const t = keys.reduce((dailyTotal, k) => {
        dailyTotal += +cur[k];
        return dailyTotal + 1;
      }, 0);
      ret.push(t);
      return ret;
    }, []);

    const marginTop = 50;
    const marginLeft = 0;

    const innerHeight = 350;

    // bounds
    const xMax = innerWidth;
    const yMax = innerHeight - 100;

    // // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.2,
      tickFormat: () => val => formatDate(val)
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      nice: true,
      domain: [0, max(totals)]
    });
    const zScale = scaleOrdinal({
      domain: keys,
      range: colorRange
    });

    const strokeColor = theme.palette.type === "dark" ? "white" : "black";
    const axisColor = strokeColor;

    return (
      <div ref={this.chart} style={{ position: "relative" }}>
        <svg width={innerWidth} height={innerHeight}>
          <Grid
            top={marginTop}
            left={marginLeft}
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke={strokeColor}
            strokeOpacity={0.2}
            xOffset={xScale.bandwidth() / 2}
          />
          <BarStack
            top={marginTop}
            data={data}
            keys={keys}
            height={yMax}
            x={x}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onMouseLeave={data => event => {
              hideTooltip();
            }}
            onMouseMove={data => event => {
              this.handleTooltip({
                event,
                data,
                xScale
              });
            }}
          />
          <AxisBottom
            scale={xScale}
            top={yMax + marginTop}
            stroke={axisColor}
            tickStroke={axisColor}
            tickLabelProps={(value, index) => ({
              fill: axisColor,
              fontSize: 11,
              textAnchor: "middle",
              opacity: 0.8,
              fontFamily: theme.typography.fontFamily
            })}
          />
        </svg>
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: "rgba(0,0,0,0.9)",
              color: "white"
            }}
          >
            <div>
              <Typography variant="body1" style={{ color: "#fff" }}>
                {tooltipData.xFormatted}
              </Typography>
              {tooltipData.data.nonRipple > 0 && (
                <Typography
                  variant="body1"
                  style={{ color: zScale("nonRipple") }}
                >
                  {labelMap["nonRipple"]} {tooltipData.data.nonRipple} (
                  {Math.round(tooltipData.data.nonRipplePer * 100)}
                  %)
                </Typography>
              )}
              {tooltipData.data.ripple > 0 && (
                <Typography variant="body1" style={{ color: "#fff" }}>
                  {labelMap["ripple"]} {tooltipData.data.ripple} (
                  {Math.round(tooltipData.data.ripplePer * 100)}
                  %)
                </Typography>
              )}
            </div>
          </Tooltip>
        )}
        <Typography
          component="div"
          style={{
            position: "absolute",
            top: innerHeight - 20,
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
              return `${labelMap[d]}`;
            }}
          />
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withTooltip(StackBarChart)
) as any;
