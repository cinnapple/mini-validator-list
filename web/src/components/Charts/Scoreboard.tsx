import React, { SFC } from "react";
import { uniq } from "../../helpers/util";
import { Col, Row, Card } from "antd";
import ValidationScore from "./ValidationScore";
import { IChartPropBase } from "../../types";

const Scoreboard: SFC<IChartPropBase<any>> = ({ dataSet, size }) => {
  const publicKeys = uniq(
    dataSet.map(
      (a: any) => a["Calendar_ValidationReports.validation_public_key"]
    )
  );
  return (
    <Row gutter={0}>
      {publicKeys.map((p: string, i: number) => {
        const relatedData = dataSet.filter(
          (d: any) =>
            d["Calendar_ValidationReports.validation_public_key"] === p
        );
        const domain = relatedData[0]["Calendar_ValidationReports.domain"];
        return (
          <Col xs={24} md={12} lg={6} key={i}>
            <Card title={`${domain}`} style={{ margin: "8px 8px" }}>
              <ValidationScore
                dataSet={relatedData}
                size={size}
                options={{ props: {} }}
              />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Scoreboard;
