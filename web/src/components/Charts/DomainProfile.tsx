import * as React from "react";
import { Avatar, Tag, Row, Col, Card } from "antd";
import { IChartPropBase, IProfileChartOptions } from "../../types";

const { Meta } = Card;

const DomainProfile: React.SFC<IChartPropBase<IProfileChartOptions>> = ({
  dataSet,
  queryItem
}) => {
  const { options } = queryItem;
  const { props } = options;
  if (!dataSet || dataSet.length === 0) {
    return <div>No profiles found!</div>;
  }
  const data = dataSet[0];
  const name = data[props.nameField];
  const domain = data[props.domainField];
  const twitter = data[props.twitterField];
  const description = data[props.descriptionField];
  const icon = data[props.iconField];
  const marginTopStyle = { marginTop: 24 };
  return (
    <>
      <Card style={{}} bordered={false}>
        <Row gutter={16} style={{}}>
          <Col>
            <Avatar
              size={128}
              src={`data:image/png;base64, ${icon}`}
              style={{
                borderRadius: "50%",
                border: "solid 1px #ccc"
              }}
            />
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
                  {/* <div style={{ marginTop: 24 }}>{description}</div> */}
                </>
              }
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DomainProfile;
