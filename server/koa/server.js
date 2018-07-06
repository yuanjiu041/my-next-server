const path = require('path')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const koa = require('koa')
const koaBody = require('koa-body')
const next = require('next')
const koaStatic = require('koa-static')
const myRouter = require('./routes.js')
const ip = require('./middleware/ip.js')
const errorMidWare = require('./middleware/error')
const loginMidWare = require('./middleware/login').loginMidWare
const env = process.env.NODE_ENV || 'development'
const dev = env === 'development'

async function koaServerCreater () {
	// 编译next
	if (!dev) {
		console.log('build next...')
		await exec('next build client')
		console.log('next build success ')
	}

	const app = next({
		dev,
		dir: './client'
	})

	await app.prepare();

	const koaServer = new koa()

	// 统一处理错误
	koaServer.use(errorMidWare())

	// 注入ip地址
	koaServer.use(ip())

	koaServer.use(koaStatic(path.join(__dirname, '../../static')))
	koaServer.use(loginMidWare({
		exclude: /(\/logout$|\/login$|\/_next\/|\/static\/)/
	}))

	// 解析POST请求，将请求体放到ctx.request.body中
	koaServer.use(koaBody())

	const router = myRouter(app)
	koaServer.use(router.routes(), router.allowedMethods())
	const server = koaServer.listen(3000)

	return {
		server,
		koaServer,
	}
}

module.exports = koaServerCreater;
