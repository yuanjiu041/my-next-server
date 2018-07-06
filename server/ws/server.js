const WebSocket = require('ws')
const { getQuery, Filter } = require('./utils')
const WebSocketServer = WebSocket.Server

function wsServerCreater (options) {
  const wss = new WebSocketServer(options)

  wss.on('connection', function (ws, req) {
    // wss websocket服务器
    // wss.clients ws的集合
    ws.__USER__ = getQuery(req, 'username')

    ws.on('message', (msg) => {

      const { user } = JSON.parse(msg)
      
      Filter(wss.clients, item => {
        return item.__USER__ !== user
      }).forEach((item) => 
        item.send(msg)
      )
    })

    ws.on('close', (e) => {
      console.log('ws close')
    })
  })

  return wss
}

module.exports = wsServerCreater
