import React from 'react'
import Layout from '../../components/Layout'

export default class extends React.Component {
  static async getInitialProps (ctx) {
    const customer = ctx.req ? ctx.req.customer : __CUSTOMER__
    return {
      customer
    }
  }

  render () {
    const { customer, url } = this.props
    return (
      <Layout url={url} customer={customer}>  
        <div>用户管理</div>
      </Layout>
    )
  }
}
