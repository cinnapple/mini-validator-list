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
          name={"Vw_UnlValidatorHistory.asOfDate"}
          label={{ formatter: val => dayjs(val).format("MMM 'YY") }}
        />
        <Axis position="left" name={"Vw_UnlValidatorHistory.count"} />
        <Tooltip showTitle={false} />
        <Geom
          type="intervalStack"
          position={`Vw_UnlValidatorHistory.asOfDate*${countField}`}
          color={`Vw_UnlValidatorHistory.domainCategory`}
        />
      </Chart>
    </div>
  );
};

export default withSize(StackedBar);
