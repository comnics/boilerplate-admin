import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Router>
    <Layout>
      <Header><Title level={2}>KTO Photo Contest 2020S</Title></Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>      
      <div>
        <nav>
          
        </nav>

      </div>
    </Router>    
  );
}

export default App;
