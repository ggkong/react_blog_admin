import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  EditOutlined,
  RadarChartOutlined
  
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
// import { Route } from 'react-router-dom';
import AddArticle from './AddArticle';
import { BrowserRouter as Router, Route } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = () => {
  const [collapsed,setCollapsed ] =  useState(false);

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed)
  };

  
    return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>工作台</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<EditOutlined />}>
            <span>添加文章</span>
        </Menu.Item>
        <SubMenu key="sub1" icon={<RadarChartOutlined />} title="文章管理">
            <Menu.Item key="3">添加文章</Menu.Item>
            <Menu.Item key="4">文章列表</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="管理员">
            <Menu.Item key="6">孔格</Menu.Item>
            <Menu.Item key="8">其它管理员</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />} >
            <span>留言管理</span>
        </Menu.Item>
        </Menu>
    </Sider>
    <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
                <div style={{ padding: 24, background: '#ffffff', minHeight: 360 }}>
                    {/* 一般 来讲 Route 外必须要有 Router 来进行包裹 但是 在这种情况下是不需要的 因为在这种情况下 Router 不需要执行捕获路由的工作 既不需要监听路由的 变化 */}
                    <Router>  
                        <Route path = '/index/' exact component = {AddArticle} />
                    </Router>
                </div>
            </div>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>kongge.cool</Footer>
    </Layout>
    </Layout>
    );
  }

export default AdminIndex;
