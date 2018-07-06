const os = require('os')

const setIp = () => async (ctx, next) => {
  ctx.req.ip = os.networkInterfaces().en0.filter(item => item.family === 'IPv4')[0].address
  await next()
}

module.exports = setIp
