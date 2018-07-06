const getCookie = (req, string) => {
  const cookie = req.headers.cookie
  const cookieArr = cookie.split(/;\s*/g)
  let rlt = {}
  cookieArr.forEach(item => {
    const [ key, value ] = item.split('=')
    rlt[key] = value
  })

  return string ? rlt[string] : rlt
}

const getQuery = (req, string) => {
  const url = req.url
  const [ realPath, query ] = url.split('?')

  if (!query) {
    return
  }
  
  const queryArr = query.split('&')
  const rlt = {}
  queryArr.forEach(item => {
    const [ key, value ] = item.split('=')
    rlt[key] = value
  })

  return string ? rlt[string] : rlt
}

const Filter = (set, fn) => {
  return new Set(Array.from(set).filter(fn))
}

const sendWithPath = (ws, data, path) => {
  if (path) {
    ws.send(JSON.stringify({
      data,
      path
    }))
  } else {
    ws.send(data)
  }
}

module.exports = {
  getCookie,
  getQuery,
  Filter,
  sendWithPath
}
