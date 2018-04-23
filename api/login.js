const loginMid = require('../server/middleware/login')
// const loginService = require('../database/users')

const userLogin = async (ctx) => {
  const rlt = await loginMid.checkUser(ctx)
  if (!rlt) {
    ctx.body = {
      code: -1,
      message: '用户名/密码错误'
    }
  } else {
    ctx.cookies.set('yx-token', rlt.value, {
      maxAge: 30 * 60 *1000
    })
    ctx.body = {
      code: 0,
      message: '登陆成功'
    }
  }
}
userLogin.method = 'post'
userLogin.route = 'login'

module.exports = {
  userLogin
}