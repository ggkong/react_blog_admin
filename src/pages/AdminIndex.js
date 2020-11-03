import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, message } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  EditOutlined,
  RadarChartOutlined,
  PoweroffOutlined
  
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle';
// eslint-disable-next-line
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Axios from 'axios';
import servicePath from '../config/apiUrl';
import ShowMe from '../pages/showMe';
import ArticleList from '../pages/ArticleList';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = (props) => {
  const [collapsed,setCollapsed ] =  useState(false);

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed)
  };
  
  const handleExit = () => {
    localStorage.removeItem('openId');
    Axios({
        method: 'get',
        url: servicePath.outLogin,
        header:{ 'Access-Control-Allow-Origin':'*' },
        withCredentials:true
    }).then((res) => {
        if(res.data.data === 'success'){
            message.success = '退出成功'
            setTimeout(() => {
                props.history.push('/');
            }, 1000)
        }else{
            message.error = '退出失败'
        }
    })
  };

  const showMefun = () => {
      props.history.push('/index/showMe/');
  };

  const handleClickArticle = () => {
      props.history.push('/index/list/');
  };

  const addArt = () => {
      props.history.push('/index/add/')
  }

  
    return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
            <span>工作台</span>
        </Menu.Item>
        <Menu.Item 
            key="2" 
            icon={<EditOutlined />}
            onClick = {addArt}
        >
            <span>添加文章</span>
        </Menu.Item>
        
        <Menu.Item
            key="sub1" 
            onClick={handleClickArticle}
            icon={<RadarChartOutlined />} 
        >
            <span>文章列表</span>
        </Menu.Item>

        <SubMenu key="sub2" icon={<TeamOutlined />} title="管理员">
            <Menu.Item key="6" onClick = {showMefun}>孔格</Menu.Item>
            <Menu.Item key="8">其它管理员</Menu.Item>
        </SubMenu>
        <Menu.Item key="10" onClick = {handleExit} icon = {<PoweroffOutlined />}>
            <span>退出登录</span>
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
                    <div>
                        {/* 监听到 router 改变成 /index 才会改变   */}
                       <Route path = '/index/' exact  component = {AddArticle} />
                       <Route path = '/index/add/' exact  component = {AddArticle} />
                       <Route path = '/index/showMe/'   component = {ShowMe}/>
                       <Route path = '/index/list/' exact  component = {ArticleList} />
                    </div>
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
