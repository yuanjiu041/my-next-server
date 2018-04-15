const Router = require('koa-router')
const glob = require('glob')
const path = require('path')
const apiPrefix = require('../config/common').apiPrefix

module.exports = (app) => {
	const router = new Router()
	const handle = app.getRequestHandler()
	const apidir = path.join(__dirname, '../api')

	glob.sync('*.js', { cwd: apidir }).forEach((apipath) => {
		apipath = apipath.replace(/(\/?index)?.js$/, '')
		var apis = require(path.join(apidir, apipath))
		Object.values(apis).map((api) => {
			router[api.method](`${apiPrefix}/${api.route}`, api)
		})
	})
	
	/*router.get('/users', (ctx) => {
		console.log('ssss')
		ctx.body = 'sss'
	})*/

	router.get('/', async (ctx) => {
		await app.render(ctx.req, ctx.res, '/')
		ctx.respond = false
	})

	router.get('/login', async (ctx) => {
		const { redirectUrl } = ctx.request.query
		ctx.req.redirectUrl = decodeURIComponent(redirectUrl)

		await app.render(ctx.req, ctx.res, '/login')
		ctx.respond = false
	})


	// 无此项next相关的js文件无法正常加载
	router.all('*', async (ctx) => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	return router
}