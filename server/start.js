const chalk = require('chalk')
const wsServerCreater = require('./ws/server')
const koaServerCreater = require('./koa/server')

async function run () {
  console.log(chalk.green('koa2 server is starting now'))

  const { server } = await koaServerCreater();

  console.log(chalk.green('koa2 server start success in //localhost:3000'))

  console.log(chalk.green('ws-server is starting now'))

  const wss = wsServerCreater({
    server
  })

  console.log(chalk.green('ws server start success in //localhost:3000'))
}

run()
