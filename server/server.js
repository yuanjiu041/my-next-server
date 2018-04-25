const path = require('path')
const koa = require('koa')
const koaBody = require('koa-body')
const next = require('next')
const koaStatic = require('koa-static')
const myRouter = require('./routes.js')
const errorMidWare = require('./middleware/error')
const loginMidWare = require('./middleware/login').loginMidWare
const env = process.env.NODE_ENV || 'development'

const app = next({
	dev: env === 'development',
	dir: './client'
})

app.prepare().then(() => {
	const server = new koa()

	// 统一处理错误
	server.use(errorMidWare())

	server.use(koaStatic(path.join(__dirname, '../static')))
	server.use(loginMidWare({
		exclude: /(\/logout$|\/login$|\/_next\/|\/static\/)/
	}))

	// 解析POST请求，将请求体放到ctx.request.body中
	server.use(koaBody())

	const router = myRouter(app)
	server.use( async (ctx, next) => {
		const starttime = new Date().getTime()
		await next()
		const duration = new Date().getTime() - starttime
		console.log(`render html in ${duration}ms`)
	})
	server.use(router.routes(), router.allowedMethods())
	server.listen(3000, () => {
    console.log('localhost:3000')
  })
})
