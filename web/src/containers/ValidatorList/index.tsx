import * as React from "react";
import { Col, Row } from "antd";
import LayoutComponent from "../../components/LayoutComponent";
import Chart from "../../cubejsAdapter";
import queriesList from "./queriesList";
import { Sizes } from "../../types";

interface Props {
  size: Sizes;
}

const getMargin = (size: Sizes) => (size === Sizes.Mobile ? 12 : 24);

const ValidatorListContainer: React.SFC<Props> = ({ size }) => {
  return (
    <LayoutComponent size={size}>
      {queriesList.map((queryItems, i) => (
        <Row key={i} gutter={24} style={{ marginBottom: getMargin(size) }}>
          {queryItems.map(query => (
            <Col
              key={query.title}
              xs={24}
              sm={24 / queryItems.length}
              style={{
                marginBottom: size === Sizes.Mobile ? getMargin(size) : 0
              }}
            >
              <Chart
                query={query.query}
                type={query.type}
                options={query.options}
                size={size}
              />
            </Col>
          ))}
        </Row>
      ))}
    </LayoutComponent>
  );
};

export default ValidatorListContainer;
