import * as React from "react";
import { Layout, Menu } from "antd";
import { Sizes } from "../types";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { Typography } from "antd";
import withSize, { SizeProps } from "../hoc/withSize";
import XRPTipBotButton from "./XRPTipBotButton";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

interface LayoutProps extends RouteComponentProps, SizeProps {
  size: Sizes;
}

const LayoutComponent: React.SFC<LayoutProps> = ({
  children,
  size,
  location
}) => {
  return (
    <Layout className="App">
      <Header>
        <div
          style={{
            margin: "18px 24px 16px 0",
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Title
            level={4}
            style={{ color: "#fff", fontFamily: "'Playfair Display', serif" }}
          >
            Mini Validator List
          </Title>
          {size !== Sizes.Mobile && (
            <div>
              <XRPTipBotButton
                amount="0.5"
                to="CinnappleFun"
                network="twitter"
                labelpt="Thanks!"
                size="190"
                stylesheet="https://minivalist.cinn.app/xrptipbutton.css"
              />
            </div>
          )}
        </div>
      </Header>
      <Content style={{ padding: "0 10px" }}>
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Statistics</Link>
          </Menu.Item>
          <Menu.Item key="/validators">
            <Link to="/validators">Validators</Link>
          </Menu.Item>
          <Menu.Item key="/unl-scoreboard">
            <Link to="/unl-scoreboard">UNL Scoreboard</Link>
          </Menu.Item>
        </Menu>
        <div
          style={{
            background: "#fff",
            maringTop: "16px",
            padding: size === Sizes.Mobile ? 12 : 24,
            minHeight: 700
          }}
        >
          <React.Suspense fallback={<div />}>{children}</React.Suspense>
        </div>
        <Footer style={{ textAlign: "center" }}>
          <XRPTipBotButton amount="0.25" to="CinnappleFun" network="twitter" />
        </Footer>
      </Content>
    </Layout>
  );
};

export default withRouter(withSize(LayoutComponent));
