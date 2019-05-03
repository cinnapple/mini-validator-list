import * as React from "react";
import { Avatar, Tag, Row, Col, Card } from "antd";
import { Sizes, IChartPropBase, IProfileChartOptions } from "../../types";

const { Meta } = Card;

const ValidatorData: React.SFC<IChartPropBase<IProfileChartOptions>> = ({
  dataSet,
  size,
  options
}) => {
  const data = dataSet[0];
  const name = data["Profiles_GeoLocation.name"];
  const domain = data["Profiles_GeoLocation.domain"];
  const twitter = data["Profiles_GeoLocation.twitter"];
  const description = data["Profiles_GeoLocation.description"];
  const icon = data["Profiles_GeoLocation.icon"];
  const { props } = options;
  const marginTopStyle = { marginTop: 24 };
  return (
    <>
      <Card style={{}} bordered={false}>
        <Row gutter={16} style={{}}>
          <Col>
            <Avatar size={128} src={`data:image/png;base64, ${icon}`} />
          </Col>
        </Row>
        <Row gutter={16} style={{ ...marginTopStyle }}>
          <Col>
            <Meta
              title={name}
              description={
                <>
                  <div>
                    <Tag color="gold">Default UNL</Tag>
                    <Tag color="green">Verified</Tag>
                  </div>
                  <div style={{ marginTop: 24 }}>{description}</div>
                </>
              }
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ValidatorData;
