module.exports = (opts = {}) => {
  const { 
    defaultStatus = 404,
    defaultCode = 9000,
    defaultMessage = '发生了未知错误'
  } = opts

  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      let {
        status = defaultStatus,
        code = defaultCode,
        message = defaultMessage
      } = err

      if (typeof err === 'string') {
        message = err
      }

      ctx.status = status
      ctx.body = {
        code,
        message
      }
    }
  }
}