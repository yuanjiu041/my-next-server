import React from 'react'
import fetch from '../fetch'
import Layout from '../components/Layout'
import { Input } from 'antd'

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
				<div>hello, {customer.nickname || customer.username}!</div>
			</Layout>
		)
	}
}
