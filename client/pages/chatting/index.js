import React, { Component } from 'react'
import Layout from 'Components/Layout'
import ChatBox from 'Components/ChatBox'
import { withRouter } from 'next/router'

class Page extends Component {
  static async getInitialProps (ctx) {
    const ip = ctx.req ? ctx.req.ip : __GLOBAL__.__IP__
    const customer = ctx.req ? ctx.req.customer : __GLOBAL__.__CUSTOMER__
    return {
      customer,
      ip
    }
  }

  render () {
    const { customer = {}, router, ip } = this.props
    return (
      <Layout url={router} customer={customer}>
        <ChatBox customer={customer} ip={ip} />
      </Layout>
    )
  }
}

export default withRouter(Page)
