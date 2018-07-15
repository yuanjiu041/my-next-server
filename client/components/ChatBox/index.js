import React, { Component } from 'react'
import { Input, Button, Col, notification } from 'antd'

import createWs from 'Common/wsUtil'
import ChatItem from 'Components/ChatItem'
import FriendBox from 'Components/FriendBox'
import style from './style.less'

const { Search } = Input

export default class extends Component {
  state = {
    chatList: []
  }

  sendMsg = (msg) => {
    const { ws } = this
    const { nickname, username } = this.props.customer
    if (msg.trim() === '') {
      return notification.warn({
        message: '发送失败',
        description: '发送内容不能为空！'
      })
    }
    if (ws) {
      const obj = {
        nickname: nickname || username,
        time: Date.now(),
        content: msg
      }
      this.addData({
        ...obj,
        isme: true
      }, this.adjustContent)
      ws.send(obj)
    }
  }

  addData = (data) => {
    this.setState((prevState) => ({
      chatList: prevState.chatList.concat(data)
    }), this.adjustContent)
    this.search.input.input.value = ''
  }

  connectByWs = () => {
    const { ip } = this.props
    const { username } = this.props.customer

    this.ws = createWs({
      url: `ws://${ip}:3000/chatting?userid=${username}`,
      message: (data, e) => {
        this.addData(data)
      },
      open: (e) => {
        console.log('socket open')
      },
      close: () => {
        console.log('close socket')
      }
    })
  }

  render () {
    const { chatList } = this.state
    const { customer, ip } = this.props

    return (
      <div className={style['chatbox']}>
        <div className={style['flex-left']}>
          <div className={style['content']} ref={el => this.content = el}>
          {
            chatList.map(item => <ChatItem key={`${item.user}-${item.time}`} {...item} />)
          }
          </div>
          <Search
            ref={(node) => this.search = node}
            enterButton="发送"
            onSearch={this.sendMsg}
          />
        </div>
        <FriendBox className={style['friend']} ip={ip} customer={customer} />
      </div>
    )
  }

  adjustContent () {
    const { offsetHeight, scrollHeight } = this.content
    this.content.scrollTop = scrollHeight - offsetHeight
  }

  componentDidMount () {
    this.connectByWs()
  }

  componentWillUnmount () {
    this.ws.close()
  }
}
