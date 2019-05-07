import React, { SFC } from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Shape, Util } from "bizcharts";
import dayjs from "dayjs";
import { Sizes, IChartPropBase, IValidatorScoreOptions } from "../../types";

let dayTracking: { [key: string]: string } = {};

const transform = (result: any[], options: IValidatorScoreOptions) => {
  const {
    dayOfWeekField,
    dateField,
    statsField,
    monthOfYearField
  } = options.props;
  dayTracking = {};
  let weekOfYear = 0;
  let currentDayOfWeek = -1;
  return result.map((r, i) => {
    const dayOfWeek = r[dayOfWeekField];
    if (currentDayOfWeek === -1) {
      weekOfYear = 0;
    }
    if (dayOfWeek < currentDayOfWeek) {
      weekOfYear++;
    }

    const day = dayjs(r[dateField]);
    if (dayOfWeek === 6) {
      const mon = day.format("MMM");
      if (!dayTracking[mon]) {
        dayTracking[mon] = weekOfYear.toString();
      }
    }

    const stats = r[statsField].split(";");

    currentDayOfWeek = dayOfWeek;
    return {
      date: day.format("YYYY-MM-DD"),
      chain: stats[0],
      total: parseInt(stats[1]),
      missed: parseInt(stats[2]),
      score: parseFloat(stats[3]),
      month: r[monthOfYearField] - 1,
      day: dayOfWeek,
      week: weekOfYear
    };
  });
};

const getColorSet = (score: number) => {
  const gra = [
    "#239a3b",
    "#F7FF14",
    "#FF6547",
    "#FF5E4A",
    "#FF574D",
    "#FF5151"
  ];
  return gra.reverse().join("-");
};

const ValidationScore: SFC<IChartPropBase<IValidatorScoreOptions>> = ({
  dataSet,
  size,
  queryItem
}) => {
  const { options } = queryItem;
  const data = transform(dataSet, options);
  data.push({
    date: "1900-01-01",
    chain: "-",
    total: 0,
    missed: 0,
    score: 0,
    month: -1,
    day: -1,
    week: -1
  });
  const dayTrackingReversed = Object.keys(dayTracking).reduce(
    (p, c) => {
      p[dayTracking[c]] = c.toString();
      return p;
    },
    {} as any
  );
  const minItem = data.reduce((a, b) => (a.score < b.score ? a : b), {} as any);
  let colorSet = getColorSet(minItem.score);

  (Shape as any).registerShape("polygon", "boundary-polygon", {
    draw(cfg: any, container: any) {
      if (!Util.isEmpty(cfg.points)) {
        const attrs = {
          stroke: "#fff",
          lineWidth: 3,
          fill: cfg.color,
          fillOpacity: cfg.opacity
        };
        const points = cfg.points;
        const path = [
          ["M", points[0].x, points[0].y],
          ["L", points[1].x, points[1].y],
          ["L", points[2].x, points[2].y],
          ["L", points[3].x, points[3].y],
          ["Z"]
        ];
        (attrs as any).path = (this as any).parsePath(path);
        const polygon = container.addShape("path", {
          attrs
        });

        container.sort();
        return polygon;
      }
    }
  });
  const cols = {
    day: {
      type: "cat",
      values: ["", "MON", "", "WED", "", "FRI", ""]
    },
    week: {
      type: "cat"
    },
    score: {
      sync: true
    }
  };
  return (
    <div
      style={{
        overflowY: "hidden",
        overflowX: size === Sizes.Mobile ? "scroll" : "hidden"
      }}
    >
      <Chart
        height={150}
        data={data as any}
        scale={cols}
        padding={[0, 0, 25, 40]}
        forceFit={size !== Sizes.Mobile}
      >
        <Tooltip title="date" />
        <Axis
          name="week"
          position="top"
          tickLine={null as any}
          line={null as any}
          label={{
            offset: 12,
            textStyle: {
              fontSize: 12,
              fill: "#666",
              textBaseline: "top"
            },
            formatter: val => dayTrackingReversed[val]
          }}
        />
        <Tooltip showTitle={false} />
        <Geom
          type="polygon"
          position="week*day*date"
          shape="boundary-polygon"
          color={["score", colorSet]}
          tooltip={[
            `date*total*missed*score`,
            (date, total, missed, score) => ({
              name: date,
              value: `${score.toFixed(4)} (A:${total} D:${missed})`
            })
          ]}
        />
        <Coord reflect="y" />
      </Chart>
    </div>
  );
};

export default ValidationScore;
