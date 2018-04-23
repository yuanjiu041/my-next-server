import React from 'react'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

const MenuItem = Menu.Item
const { Header, Sider, Content } = Layout
export default class extends React.Component {
  render () {
    const { url, customer } = this.props

    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header>
          <span style={{color: '#fff', fontSize: 20, marginLeft: -10}}>next</span>
          <span style={{float: 'right', color: '#fff'}}>欢迎您，{customer.nickname || customer.username}</span>
        </Header>
        <Layout>
          <Sider width={200} style={{
            background: '#fff',
            borderRight: 'solid 3px #eee'
          }}>
            <Menu
              mode="inline"
              selectedKeys={[url.pathname || '/']}
            >
              <MenuItem key='/'><Link href='/'><a>首页</a></Link></MenuItem>
              <MenuItem key='/users'><Link href='/users'><a>用户管理</a></Link></MenuItem>
            </Menu>
          </Sider>
          <Content style={{padding: 30, backgroundColor: '#fff'}}>{this.props.children}</Content>
        </Layout>
      </Layout>
    )
  }
}