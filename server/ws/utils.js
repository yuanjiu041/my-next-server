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

module.exports = {
  getCookie,
  getQuery,
  Filter
}
