// 对于浏览器端ws的封装

const createWs = (options) => {
  if (typeof window !== 'undefined' && window.WebSocket) {
    const { url, message, ...eventListeners } = options

    if (!url)
      throw new Error('url is required')

    const ws = new WebSocket(url)

    ws.addEventListener('message', (e) => {
      message(JSON.parse(e.data), e)
    })

    Object.keys(eventListeners).map(eventType => {
      ws.addEventListener(eventType, eventListeners[eventType])
    })

    ws.sendObj = (data) => {
      if (typeof data !== 'object')
        throw new Error('data must be a object')
      ws.send(JSON.stringify(data))
    }

    return ws
  }
}

export default createWs
