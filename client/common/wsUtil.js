const pathToRegExp = require('path-to-regexp')
const parse = require('url-parse')

// 对于浏览器端ws的封装

const createWs = (options) => {
  if (typeof window !== 'undefined' && window.WebSocket) {
    const { url, message, close, ...eventListeners } = options

    if (!url)
      throw new Error('url is required')

    const { pathname, query, origin } = parse(url)

    let ws

    // 判断是否已有当前origin的ws对象，若无，则新建
    if (window[`__WS_${origin}__`]) {
      ws = window[`__WS_${origin}__`]
    } else {
      ws = new WebSocket(origin + query)
      window[`__WS_${origin}__`] = ws
      ws.messageList = {}

      // 将不用path的处理函数放在messageList中，收到信息时执行对应的处理函数
      ws.addEventListener('message', (e) => {
        const { path, data } = JSON.parse(e.data)

        const matched = Object.keys(ws.messageList).filter(item => {
          return pathToRegExp(item).test(path)
        })

        matched.map(item => {
          ws.messageList[item](data, e)
        })
      })
    }

    ws.messageList[pathname] = message

    Object.keys(eventListeners).map(eventType => {
      ws.addEventListener(eventType, eventListeners[eventType])
    })

    const sendObj = (data) => {
      if (typeof data !== 'object')
        throw new Error('data must be a object')
      ws.send(JSON.stringify(data))
    }

    return {
      send: (data) => sendObj({
        path: pathname,
        data
      }),
      close: () => {
        close()
        delete ws.messageList[pathname]
        if (!Object.keys(ws.messageList).length) {
          ws.close()
        }
      }
    }
  }
}

export default createWs
