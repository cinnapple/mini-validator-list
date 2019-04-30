import * as React from "react";
import { Layout, Menu } from "antd";
import { Sizes } from "../types";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import XRPTipBotButton from "./XRPTipBotButton";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  size: Sizes;
}

const LayoutComponent: React.SFC<LayoutProps> = ({ size, children }) => {
  const [state, setState] = React.useState({
    current: window.location.pathname
  });
  return (
    <Layout className="layout">
      <Header>
        <div
          style={{
            margin: "18px 24px 16px 0",
            float: "left"
          }}
        >
          <Title
            level={4}
            style={{ color: "#fff", fontFamily: "'Playfair Display', serif" }}
          >
            Mini Validator List
          </Title>
        </div>
      </Header>
      <Content style={{ padding: "0 10px" }}>
        <Menu mode="horizontal" selectedKeys={[state.current]}>
          <Menu.Item key="/">
            <Link to="/" onClick={() => setState({ current: "/" })}>
              Statistics
            </Link>
          </Menu.Item>
          <Menu.Item key="/validators">
            <Link
              to="/validators"
              onClick={() => setState({ current: "/validators" })}
            >
              Validators
            </Link>
          </Menu.Item>
          <Menu.Item key="/unl-analysis">
            <Link
              to="/unl-analysis"
              onClick={() => setState({ current: "/unl-analysis" })}
            >
              UNL Analysis
            </Link>
          </Menu.Item>
        </Menu>
        <div
          style={{
            background: "#fff",
            maringTop: "16px",
            padding: size === Sizes.Mobile ? 12 : 24,
            minHeight: 280
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <XRPTipBotButton amount="0.25" to="CinnappleFun" network="twitter" />
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
