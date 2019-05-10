import React, { SFC } from "react";
import { uniq } from "../../helpers/util";
import { Col, Row, Card } from "antd";
import ValidationScore from "./ValidationScore";
import { IChartPropBase, IScoreboardOptions } from "../../types";
import withSize from "../../hoc/withSize";

const Scoreboard: SFC<IChartPropBase<IScoreboardOptions>> = ({
  dataSet,
  size,
  queryItem
}) => {
  const { options } = queryItem;
  const { props } = options;
  const publicKeys = uniq(
    dataSet.map((a: any) => a[props.validationPublicKeyField])
  );
  return (
    <Row gutter={0}>
      {publicKeys.map((p: string, i: number) => {
        const relatedData = dataSet.filter(
          (d: any) => d[props.validationPublicKeyField] === p
        );
        const domain = relatedData[0][props.domainField];
        return (
          <Col xs={24} md={12} lg={6} key={i}>
            <Card title={`${domain}`} style={{ margin: "8px 8px" }}>
              <ValidationScore
                dataSet={relatedData}
                size={size}
                queryItem={{ options } as any}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default withSize(Scoreboard);
