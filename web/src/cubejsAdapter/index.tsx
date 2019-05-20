import * as React from "react";
import {
  SupportedPivotTypes,
  ICubeJsPivotConfig,
  ICubeJsQuery,
  IQueryItem
} from "../types";
import Loading from "../components/Loading";
import ChartRenderer from "../components/ChartRenderer";
import cubejsClient from "./cubejs";

interface Props {
  queryItem: IQueryItem<any>;
  onDrilldown: any;
}

interface State {
  dataSet: any[] | undefined;
  errors: any[] | undefined;
}

const pivot = (
  resultSet: any,
  type?: SupportedPivotTypes,
  config?: ICubeJsPivotConfig
) => {
  if (type === "chart") {
    return resultSet.chartPivot(config);
  }
  if (type === "table") {
    return resultSet.tablePivot(config);
  }
  return resultSet.rawData();
};

const Chart: React.SFC<Props> = ({ queryItem, onDrilldown }) => {
  const [state, setState] = React.useState<State>({
    dataSet: undefined,
    errors: undefined
  });
  const { type, pivotType, pivotConfig } = queryItem;

  React.useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        queryItem.queries.map((query: ICubeJsQuery) => cubejsClient.load(query))
      );

      const dataSet = results.map((resultSet: any, i: number) =>
        pivot(resultSet, pivotType, pivotConfig)
      );

      setState({
        ...state,
        dataSet: dataSet.length === 1 ? dataSet[0] : dataSet,
        errors: undefined
      });
    };
    fetchData();
  }, []);

  const { dataSet, errors } = state;

  if (!dataSet) {
    return <Loading />;
  }

  if (errors) {
    return <div>{errors}</div>;
  }

  return (
    <ChartRenderer
      type={type}
      chartProps={{
        dataSet,
        queryItem,
        onDrilldown
      }}
    />
  );
};

export default Chart;
