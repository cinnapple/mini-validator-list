import React, { SFC } from "react";
import { Col, Row, Card } from "antd";
import ValidationScore from "../Charts/ValidationScore";
import { IChartPropBase, IScoreboardOptions } from "../../types";
import withSize from "../../hoc/withSize";
import DomainProfile from "../Charts/DomainProfile";
import WorldMap from "../Charts/WorldMap";

const ValidatorProfileContainer: SFC<IChartPropBase<IScoreboardOptions>> = ({
  dataSet,
  size,
  queryItem
}) => {
  const { options } = queryItem;
  const [score, profile] = dataSet;
  return (
    <Row gutter={0}>
      <Col xs={24}>
        <Card
          title={`Validation Score`}
          bordered={false}
          bodyStyle={{ padding: 12 }}
        >
          <ValidationScore
            dataSet={score}
            size={size}
            queryItem={{ options } as any}
          />
        </Card>
      </Col>
      <Col xs={24}>
        <Card title={`Operator`} bordered={false} bodyStyle={{ padding: 12 }}>
          <DomainProfile
            dataSet={profile}
            size={size}
            queryItem={{ options } as any}
          />
        </Card>
      </Col>
      <Col xs={24}>
        <Card title={`Location`} bordered={false} bodyStyle={{ padding: 12 }}>
          <WorldMap
            dataSet={profile}
            size={size}
            queryItem={{ options } as any}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default withSize(ValidatorProfileContainer);
