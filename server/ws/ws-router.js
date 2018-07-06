const pathToRegExp = require('path-to-regexp')

class WsRouter {
  constructor (ws, wss, userId) {
    this.ws = ws
    this.wss = wss
    this.eventList = {}
    this.userId = userId
  }

  on (type, path, fn) {
    const { eventList } = this
    if (!eventList[type]) {
      eventList[type] = []
    }

    eventList[type][path] = fn
  }

  init () {
    const { eventList, ws, wss } = this
    Object.keys(eventList).map(item => {
      ws.on(item, (msg) => {
        const { path, data } = JSON.parse(msg)

        const fns = eventList[item]

        const matched = Object.keys(fns).filter(item => {
          return pathToRegExp(item).test(path)
        })

        matched.map(item => {
          fns[item](msg, ws, wss)
        })
      })
    })
  }
}



module.exports = WsRouter
