import React, { useState } from 'react'
import { Layout, Card, Tabs,  } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons'
import { Editor } from '@/core/editor/Editor';
import { Frame } from '@/core/render/Frame';
import 'antd/dist/antd.css'
import { Logo } from './components/Logo';
import { Menu, MenuItem } from './components/Menu'
// import { } from './components/Layout'
import { Row, Col } from './components/Row';
import './index.css'
import { Button, Carousel, Container, Alert } from './components/others';
import Sider from 'antd/lib/layout/Sider';
import { ButtonCreator } from './creator';

const { Content, Header } = Layout
const TabPane = Tabs.TabPane

const Page = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div id="app">
      <Editor>
        <Frame>
    <Layout>
      <Header className="header">
        <Logo />
      </Header>
      <Layout style={{ flexDirection: 'row', background: '#fff' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#ccc'
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
              <Button style={{ margin: 15 }} type="primary">Primary Button</Button>
              <Button style={{ margin: 15 }} type="dashed" danger>Danger Dashed Button</Button>
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
              <Alert style={{ margin: 10 }} message="Success Tips" type="success" showIcon />
              <Alert style={{ margin: 10 }} message="Informational Notes" type="info" showIcon />
              <Alert style={{ margin: 10 }} message="Warning" type="warning" showIcon closable />
              <Alert style={{ margin: 10 }} message="Error" type="error" showIcon />
            </Col>
          </Row>
        </Container>
        </Content>
        <Sider>
          <ButtonCreator />
        </Sider>
      </Layout>
    </Layout>
        </Frame>
      </Editor>
    </div>
  )
}

export default Page
