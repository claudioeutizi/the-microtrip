import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import "./Styles/Keyboard.css"
import io from "socket.io-client"

import { Layout, Menu, theme } from 'antd';
import { Card } from 'antd';

const { Header, Content, Footer } = Layout;
// fetching the GET route from the Express server which matches the GET route from server.js

function App () {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  var [temperature, setTemperature] = useState({});
  var [humidity, setHumidity] = useState({});
  var [light, setLight] = useState({});
  
  useEffect(() => {
    const socket = io.connect("http://localhost:9000");
    socket.on("temperature-message", (data) => {
      setTemperature(data);
    })
    socket.on("humidity-message", (data) => {
      setHumidity(data);
    })
    socket.on("light-message", (data) => {
      setLight(data);
    })
  }, [temperature, humidity, light])

  return (
    <Layout>
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <div
        style={{
          float: 'left',
          width: 120,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>

    <Content className="site-layout" style={{ padding: '0 50px' }}>
      <div style={{ padding: 24, minHeight: 380, background: colorBgContainer, alignItems:'end'}}>

      <Card title="Light" style={{ width: 300 }}>
      <p>Value: {light.value}</p>
      <p>Timestamp: {light.timestamp}</p>
    </Card>
    <Card size="small" title="Temperature" style={{ width: 300 }}>
      <p>Value: {temperature.value}</p>
      <p>Timestamp: {temperature.timestamp}</p>
    </Card>
    <Card size="small" title="Humidity" style={{ width: 300 }}>
      <p>Value: {humidity.value}</p>
      <p>Timestamp: {humidity.timestamp}</p>
    </Card>
         <Piano keyCount = {61} keyboardLayout = {'C'}/>
      </div>
    </Content>
    
    <Footer style={{ textAlign: 'center' }}>ACTAM Project ©2023 Created by Claudio Eutizi, Mattia Massimi, Vittoria Malaman, Greta Gibelli</Footer>
  </Layout>
  )
}

export default App;