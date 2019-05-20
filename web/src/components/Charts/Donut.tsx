import * as React from "react";
import { Chart, Axis, Tooltip, Geom, Coord, Legend, Guide } from "bizcharts";
import DataSet from "@antv/data-set";
import { IChartPropBase, IDonutChartOptions } from "../../types";
const { Text } = Guide;
const { DataView } = DataSet;

const scale = {
  percent: {
    formatter: (val: any) => val.toFixed(3) * 100 + "%"
  }
};

const DonutChart: React.SFC<IChartPropBase<IDonutChartOptions>> = ({
  dataSet,
  queryItem,
  onDrilldown
}) => {
  const { options } = queryItem;
  const { props, titleField, supportText } = options;
  const countMeasure = queryItem.queries[0].measures![0];
  const dv = new DataView();
  dv.source(dataSet).transform({
    type: "percent",
    field: countMeasure,
    dimension: "category",
    as: "percent"
  });

  const verifiedPercentage = (
    dv.rows.find((a: any) => a.category === titleField).percent * 100
  ).toFixed(0);

  const innerTitle = `${verifiedPercentage}%`;

  return (
    <Chart
      {...props}
      height={400}
      data={dv}
      scale={scale}
      padding={[0, 0, 50, 0]}
      forceFit
      onPlotClick={ev => {
        if (onDrilldown && ev.data && ev.data._origin) {
          onDrilldown(ev.data._origin);
        }
      }}
    >
      <Coord type="theta" radius={0.75} innerRadius={0.65} />
      <Axis name="category" />
      <Legend />
      <Tooltip showTitle={false} />
      <Geom
        type="intervalStack"
        tooltip={[
          `category*percent*${countMeasure}`,
          (category, percent, count) => ({
            name: category,
            value: `${count} (${(percent * 100).toFixed(1)}%)`
          })
        ]}
        position="percent"
        color="category"
        style={{
          lineWidth: 1,
          stroke: "#fff"
        }}
      />
      <Guide>
        <Text
          position={["50%", "45%"]}
          content={innerTitle}
          style={{
            lineHeight: "240px",
            fontSize: "36",
            fontWeight: "bold",
            textAlign: "center"
          }}
        />
        <Text
          position={["50%", "55%"]}
          content={supportText[0]}
          style={{
            lineHeight: "240px",
            fontSize: "16",
            textAlign: "center"
          }}
        />
        <Text
          position={["50%", "60%"]}
          content={supportText[1]}
          style={{
            lineHeight: "240px",
            fontSize: "16",
            textAlign: "center"
          }}
        />
      </Guide>
    </Chart>
  );
};

export default DonutChart;
