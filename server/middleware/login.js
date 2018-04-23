const loginService = require('../../database/users')

// 登陆调用，确认用户身份并且生成一个新的token
const checkUser = async (ctx) => {
  const rlt = await loginService.getUsers(ctx.request.body)
  if (rlt.count) {
    const user = rlt.data[0]
    const token = {
      value: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
      time: Date.now() + 30 * 60 * 1000
    }
    await loginService.updateUser(user, { token })
    return token
  }
  return false
}

const loginMidWare = (opts) => async (ctx, next) => {
  const token = ctx.cookies.get('yx-token')

  // login登陆页面和next生成的js文件，绕过检测
  if (/(\/login$|\/_next\/|\/static\/)/.test(ctx.path))
    return await next()

  // 检验token对应的用户
  if (token) {
    const rlt = await loginService.getUsers({'token.value': token})
    if (rlt.count) {
      const user = rlt.data[0]
      if (user.token && user.token.time > Date.now()) {
        ctx.req.customer = user
        const newTime = Date.now() + 30 * 60 * 1000
        ctx.cookies.set('yx-token', token, {
          axAge: 30 * 60 *1000
        })
        await Promise.all([
          loginService.updateUser(user, {'token.time': newTime}),
          next()
        ])
        return
      }
    }
  }
 
  if (/\/api\//.test(ctx.path)) {
    // 如果是请求数据的接口，则不返回任何数据
    return ctx.body = {}
  } else {
    // 页面接口重定向到login页面
    ctx.redirect(`/login?redirectUrl=${encodeURIComponent(ctx.request.URL.href)}`)
  } 
}

module.exports = {
  checkUser,
  loginMidWare
}