import React, { SFC } from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import {
  Sizes,
  IChartPropBase,
  IHorizontalStackBarChartOptions
} from "../../types";
import withSize from "../../hoc/withSize";

const HorizontalStackedBar: SFC<
  IChartPropBase<IHorizontalStackBarChartOptions>
> = ({ dataSet, queryItem, size, onDrilldown }) => {
  const { options } = queryItem;
  const { props } = options;
  const data = dataSet.map((a: any) => ({
    ["Vw_ValidatorDetails.countryName"]: a["Vw_ValidatorDetails.countryName"],
    "Not in UNL but Verified": parseInt(
      a["Vw_ValidatorDetails.notUnlButVerifiedSum"]
    ),
    "In UNL": parseInt(a["Vw_ValidatorDetails.unlSum"])
  }));
  const ds = new DataSet();
  const dv = ds.createView().source(data);
  dv.transform({
    type: "fold",
    fields: ["In UNL", "Not in UNL but Verified"],
    key: "Category",
    value: "Total",
    retains: ["Vw_ValidatorDetails.countryName"]
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
            onDrilldown(ev.data._origin);
          }
        }}
      >
        <Legend />
        <Coord />
        <Axis
          name="Vw_ValidatorDetails.countryName"
          label={{
            offset: 12
          }}
        />
        <Axis name="Total" />
        <Tooltip />
        <Geom
          type="intervalStack"
          position="Vw_ValidatorDetails.countryName*Total"
          color={"Category"}
        />
      </Chart>
    </div>
  );
};

export default withSize(HorizontalStackedBar);
