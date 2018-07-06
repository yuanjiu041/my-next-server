import React, { Component } from 'react'
import createWs from 'Common/wsUtil'

export default class extends Component {
  state = {
    onlineUsers: []
  }

  render () {
    const { onlineUsers } = this.state
    const { className } = this.props

    const cls = [
      className
    ]

    return (
      <div className={cls.join(' ').trim()}>{
        onlineUsers.map(item => {
          return <p key={item.username}>{item.nickname || item.username}</p>
        })
      }</div>
    )
  }

  componentDidMount () {
    const { ip, customer } = this.props
    const { username } = customer
    this.ws = createWs({
      url: `ws://${ip}:3000/friend?userid=${username}`,
      message: (data, e) => {
        this.setState({
          onlineUsers: data
        })
      }
    })

    // 发送空消息，获取好友列表
    setTimeout(() => this.ws.send(''), 100)
  }
}
