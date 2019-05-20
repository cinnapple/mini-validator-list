import React, { SFC } from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import dayjs from "dayjs";
import { Sizes, IChartPropBase, IStackBarChartOptions } from "../../types";
import withSize from "../../hoc/withSize";

const StackedBar: SFC<IChartPropBase<IStackBarChartOptions>> = ({
  dataSet,
  size,
  onDrilldown,
  queryItem
}) => {
  const { options } = queryItem;
  const { props, xField, yField, colorField } = options;
  const data = dataSet.map((a: any) => ({
    ...a,
    [yField]: parseInt(a[yField])
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
            onDrilldown(ev.data._origin);
          }
        }}
      >
        <Legend />
        <Axis
          name={xField}
          label={{ formatter: val => dayjs(val).format("MMM 'YY") }}
        />
        <Axis position="left" name={yField} />
        <Tooltip showTitle={false} />
        <Geom
          type="intervalStack"
          position={`${xField}*${yField}`}
          color={colorField}
        />
      </Chart>
    </div>
  );
};

export default withSize(StackedBar);
