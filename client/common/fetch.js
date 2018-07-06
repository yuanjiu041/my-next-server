import axios from 'axios'

const apiPrefix = '/yx/api'

const fetch = (ctx, api, options = {}) => {
  if (typeof ctx === 'string') {
    options = api || {}
    api = ctx
    ctx = null
  }

  if (typeof window === 'undefined') {
    options.url = `http://localhost:3000${apiPrefix}/${api}`

    if (ctx) {
      options.headers = {
        cookie: ctx.req.headers.cookie
      }
    }
  } else {
    options.url = `${apiPrefix}/${api}`
  }

  return axios(options).then(res => res.data)
}

const simpleMethods = ['get', 'delete', 'head', 'options']
const complexMethods = ['post', 'put', 'patch']

simpleMethods.forEach((method) => {
  fetch[method] = (ctx, api, options = {}) => {
    if (typeof ctx === 'string') {
      options = api || {}
      api = ctx
      ctx = null
    }
    return fetch(ctx, api, Object.assign(options, { method }))
  }
})

complexMethods.forEach((method) => {
  fetch[method] = (ctx, api, data = {}, options = {}) => {
    if (typeof ctx === 'string') {
      options = data || {}
      data = api || {}
      api = ctx
      ctx = null
    }
    return fetch(ctx, api, Object.assign(options, { method, data }))
  }
})

export default fetch
