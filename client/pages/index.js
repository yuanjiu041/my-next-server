import React from 'react'
import fetch from '../fetch'
import { Input } from 'antd'

export default class extends React.Component {
	static async getInitialProps (ctx) {
		const customer = ctx.req && ctx.req.customer
		return {
			name:'yuanjiu',
			customer
		}
	}
	render () {
		const { customer } = this.props
		return (
			<div>hello, {customer.nickname || customer.username}!</div>
		)
	}
}
  