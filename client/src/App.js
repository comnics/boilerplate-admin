import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

import { Layout, Menu, Breadcrumb, Typography } from "antd";

import HeaderBasic from './components/views/Header/HeaderBasic'

const { Title, Text, Link } = Typography;
const { Header, Footer, Content } = Layout;

function App() {
    return (
        <Router>
            <Layout className="layout">
                <Header className="header">
                    <HeaderBasic />
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path="/" component={Auth(LandingPage, null)} />
                            <Route exact path="/login" component={Auth(LoginPage, false)} />
                            <Route exact path="/register" component={Auth(RegisterPage, false)} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    <text>Copyright OOOOO.</text>
                    <Link href="http://#" target="_blank" style={{marginLeft: '10px'}}>
                        Front
                    </Link>
                </Footer>
            </Layout>
        </Router>
    );
}

export default App;
