module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    let {
      status = 404,
      code = 9000,
      message = '发生了未知的错误'
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