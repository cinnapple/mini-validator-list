import React, { SFC } from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import dayjs from "dayjs";
import { Sizes, IChartPropBase, IStackBarChartOptions } from "../../types";

const StackedBar: SFC<IChartPropBase<IStackBarChartOptions>> = ({
  dataSet,
  size,
  onDrilldown,
  queryItem
}) => {
  const { options, query } = queryItem;
  const { props } = options;
  const countField = (query.measures && query.measures[0]) as string;
  const data = dataSet.map((a: any) => ({
    ...a,
    [countField]: parseInt(a[countField])
  }));
  return (
    <div
      style={{
        overflowY: "hidden",
        overflowX: size === Sizes.Mobile ? "scroll" : "hidden"
      }}
    >
      <Chart
        {...props}
        height={400}
        data={data}
        padding={[20, 20, 90, 25]}
        forceFit={size !== Sizes.Mobile}
        onPlotClick={ev => {
          if (ev.data && onDrilldown) {
            onDrilldown({ selected: ev.data._origin });
          }
        }}
      >
        <Legend />
        <Axis
          name={"UnlHistory.asOfDate"}
          label={{ formatter: val => dayjs(val).format("MMM 'YY") }}
        />
        <Axis position="left" name={"UnlHistory.count"} />
        <Tooltip showTitle={false} />
        <Geom
          type="intervalStack"
          position={`UnlHistory.asOfDate*${countField}`}
          color={`UnlHistory.domainCategory`}
        />
      </Chart>
    </div>
  );
};

export default StackedBar;
