import React, { useState } from "react";
import { Layout, Card } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { Editor } from "@/core/editor/Editor";
import { Frame } from "@/core/render/Frame";
import { Logo } from "./components/Logo";
import { Row, Col } from "./components/Row";
import { Button, Carousel, Container, Alert } from "./components/others";
import { ButtonCreator } from "./creator";
import { SettingsPanel } from './components/setting';
import "antd/dist/antd.css";
import "./index.css";

const { Content, Header, Sider } = Layout;

const Page = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div id="app">
      <Editor>
        <Frame>
          <Layout>
            <Header className="header">
              <Logo />
            </Header>
            <Layout style={{ flexDirection: "row", background: "#fff" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  background: "#ccc",
                  height: '100vh',
                  overflow: 'auto'
                }}
              >
                <div>
                  <Row gutter={40}>
                    <Col span={8}>
                      <Card className="my-card" title="Card title">
                        Card content1
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="Card title" bordered={false}>
                        Card content2
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="Card title" bordered={false}>
                        Card content3
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card title="Card title" bordered={false}>
                        Card content4
                      </Card>
                    </Col>
                  </Row>
                </div>

                <Container>
                  <Carousel />
                  <Row gutter={20}>
                    <Col span={12}>
                      <Button style={{ margin: 15 }} type="primary">
                        Primary Button
                      </Button>
                      <Button style={{ margin: 15 }} type="dashed" danger>
                        Danger Dashed Button
                      </Button>
                      <Button
                        type="primary"
                        style={{ margin: 15 }}
                        icon={<PoweroffOutlined />}
                        loading={loading}
                        onClick={() => setLoading(true)}
                      >
                        Click me!
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Alert
                        style={{ margin: 10 }}
                        message="Success Tips"
                        type="success"
                        showIcon
                      />
                      <Alert
                        style={{ margin: 10 }}
                        message="Informational Notes"
                        type="info"
                        showIcon
                      />
                      <Alert
                        style={{ margin: 10 }}
                        message="Warning"
                        type="warning"
                        showIcon
                        closable
                      />
                      <Alert
                        style={{ margin: 10 }}
                        message="Error"
                        type="error"
                        showIcon
                      />
                    </Col>
                  </Row>
                </Container>
              </Content>
              <Sider style={{background: '#fff', paddingLeft: 10 }}>
                <ButtonCreator />
                <SettingsPanel />
              </Sider>
            </Layout>
          </Layout>
        </Frame>
      </Editor>
    </div>
  );
};

export default Page;
