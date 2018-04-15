const loginService = require('../../database/login')

// 登陆调用，确认用户身份并且生成一个新的token
const checkUser = async (ctx) => {
  const users = await loginService.getUsers(ctx.request.body)
  if (users.length) {
    const user = users[0]
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
    const users = await loginService.getUsers({'token.value': token})
    if (users) {
      ctx.req.customer = users[0]
      return await next()
    }
  }

  // 用户不存在或者token过期，则重定向到登陆页面
  ctx.redirect(`/login?redirectUrl=${encodeURIComponent(ctx.request.URL.href)}`)
}

module.exports = {
  checkUser,
  loginMidWare
}