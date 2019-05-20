import React, { SFC } from "react";
import { uniq } from "../../helpers/util";
import { Col, Row, Card, Tooltip, Avatar } from "antd";
import ValidationScore from "../Charts/ValidationScore";
import { IChartPropBase, IScoreboardOptions } from "../../types";
import withSize from "../../hoc/withSize";

const getTitleElement = (domain: string, pubkey: string, icon: string) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        size={35}
        style={{
          verticalAlign: "middle",
          borderRadius: "50%",
          border: "solid 1px #ccc"
        }}
        src={icon ? `data:image/png;base64, ${icon}` : `default-map-icon.png`}
      />
      <div style={{ marginLeft: 10, verticalAlign: "middle" }}>
        <Tooltip
          placement="topLeft"
          overlayStyle={{
            fontSize: "smaller"
          }}
          title={<code>{pubkey}</code>}
        >
          {domain}
        </Tooltip>
      </div>
    </div>
  );
};

const ScoreboardContainer: SFC<IChartPropBase<IScoreboardOptions>> = ({
  dataSet,
  size,
  queryItem
}) => {
  const { options } = queryItem;
  const { props } = options;
  const [scores, validators] = dataSet;
  const publicKeys = uniq(
    scores.map((a: any) => a[props.validationPublicKeyField])
  );
  return (
    <Row gutter={0}>
      {publicKeys.map((p: string, i: number) => {
        const relatedData = scores.filter(
          (d: any) => d[props.validationPublicKeyField] === p
        );
        const relatedValidator = validators.filter(
          (d: any) => d["Vw_ValidatorDetails.validation_public_key"] === p
        );
        const domain = relatedData[0][props.domainField];
        const pubkey = relatedData[0][props.validationPublicKeyField];
        const icon = relatedValidator[0]
          ? relatedValidator[0]["Vw_ValidatorDetails.icon"]
          : "";
        return (
          <Col xs={24} md={12} lg={6} key={i}>
            <Card
              title={getTitleElement(domain, pubkey, icon)}
              style={{ margin: "8px 8px" }}
            >
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

export default withSize(ScoreboardContainer);
