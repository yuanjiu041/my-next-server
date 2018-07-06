const WebSocket = require('ws')
const WsRouter = require('./ws-router')
const { getUsers } = require('../../database/users')
const { getQuery, Filter, sendWithPath } = require('./utils')
const WebSocketServer = WebSocket.Server

function wsServerCreater (options) {
  const wss = new WebSocketServer(options)

  const onlineUser = []

  wss.on('connection', function (ws, req) {
    // wss websocket服务器
    // wss.clients ws的集合

    console.log('connect...')

    const userId = getQuery(req, 'userid')

    onlineUser.push(userId)

    ws.__USERID__ = userId

    // 路由封装
    const wsRouter = new WsRouter(ws, wss, userId)

    wsRouter.on('message', '/chatting', (msg, ws, wss) => {
      Filter(wss.clients, item => {
        return item.__USERID__ !== userId
      }).forEach((item) => {
        item.send(msg)
      })
    })

    wsRouter.on('message', '/friend', (msg, ws, wss) => {
      undateOnlineUser(onlineUser, wss)
    })

    wsRouter.init()

    ws.on('close', e => {
      // 移除在线用户
      onlineUser.splice(onlineUser.indexOf(userId), 1)
      undateOnlineUser(onlineUser, wss)
    })
  })

  return wss
}

function undateOnlineUser (onlineUser, wss) {
  getUsers({
    username: {
      $in: onlineUser
    }
  }, 0, 2000, [
    'username',
    'nickname'
  ]).then(({data}) => {
    wss.clients.forEach(item => sendWithPath(item, data, '/friend'))
  })
}

module.exports = wsServerCreater
