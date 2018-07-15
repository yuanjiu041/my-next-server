const os = require('os')
const { serverIp } = require('../../../config/common')

const setIp = () => async (ctx, next) => {
  ctx.req.ip = serverIp
  await next()
}

module.exports = setIp
