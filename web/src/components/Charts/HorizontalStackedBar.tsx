import React, { SFC } from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import {
  Sizes,
  IChartPropBase,
  IHorizontalStackBarChartOptions
} from "../../types";

const HorizontalStackedBar: SFC<
  IChartPropBase<IHorizontalStackBarChartOptions>
> = ({ dataSet, query, options, size, onDrilldown }) => {
  const { props } = options;
  const data = dataSet.map((a: any) => ({
    ["GeoLocation.countryName"]: a["GeoLocation.countryName"],
    "Not in UNL but Verified": parseInt(a["GeoLocation.notUnlButVerifiedSum"]),
    "In UNL": parseInt(a["GeoLocation.unlSum"])
  }));
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "fold",
    fields: ["In UNL", "Not in UNL but Verified"],
    key: "Category",
    value: "Total",
    retains: ["GeoLocation.countryName"]
  });
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
        data={dv}
        forceFit={size !== Sizes.Mobile}
        padding={[20, 20, 90, 25]}
        onPlotClick={ev => {
          if (ev.data && onDrilldown) {
            onDrilldown({ selected: ev.data._origin });
          }
        }}
      >
        <Legend />
        <Coord />
        <Axis
          name="GeoLocation.countryName"
          label={{
            offset: 12
          }}
        />
        <Axis name="Total" />
        <Tooltip />
        <Geom
          type="intervalStack"
          position="GeoLocation.countryName*Total"
          color={"Category"}
        />
      </Chart>
    </div>
  );
};

export default HorizontalStackedBar;
