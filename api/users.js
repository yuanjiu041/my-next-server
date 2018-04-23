const usersService = require('../database/users')

const queryUsers = async (ctx) => {
  const { filter = {}, skip = 0, limit = 10 } = ctx.request.body
  const rlt = await usersService.getUsers(filter, skip, limit)
  ctx.body = rlt
}

queryUsers.method = 'post'
queryUsers.route = 'users/query'

const createUser = async (ctx) => {
  const rlt = await usersService.insertUser(ctx.request.body)
  ctx.body = {
    code: 0,
    message: '添加成功'
  }
}

createUser.method = 'post'
createUser.route = 'user'

const deleteUser = async (ctx) => {
  const { id } = ctx.params
  const rlt = await usersService.removeUser({_id: id})
  ctx.body = {
    code: 0,
    message: '删除成功'
  }
}

deleteUser.method = 'delete'
deleteUser.route = 'user/:id'

module.exports = {
  queryUsers,
  createUser,
  deleteUser
}