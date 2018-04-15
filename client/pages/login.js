import React from 'react'
import LoginForm from '../components/LoginForm'

export default class extends React.Component {
  static getInitialProps (ctx) {
    const redirectUrl = ctx.req && ctx.req.redirectUrl
    return {
      redirectUrl
    }
  }

  render () {
    return (
      <LoginForm url={this.props.redirectUrl} />
    )
  }
}