import React from 'react'
import fetch from 'Common/fetch'
import { withRouter } from 'next/router'
import Layout from 'Components/Layout'
import { Input } from 'antd'

class Page extends React.Component {
	static async getInitialProps (ctx) {
		const customer = ctx.req ? ctx.req.customer : __GLOBAL__.__CUSTOMER__
		return {
			customer
		}
	}
	
	render () {
		const { customer = {}, router } = this.props
		return (
			<Layout url={router} customer={customer}>	
				<div>hello, {customer.nickname || customer.username}!</div>
			</Layout>
		)
	}
}

export default withRouter(Page)
