// 连接mongoDB获取数据，通过promise的形势来封装

const util = require('./util.js')
const { connectDB, formatInsertData, formatUpdateData, formatId } = util

// 根据username获取一个用户
const getUsers = async (opts = {}, skip = 0, limit = 10) => {
  const db = await connectDB().catch((err) => { throw err })
  return new Promise((resolve, reject) => {
    Promise.all([
      db.db('test').collection('login').find(formatId(opts)).skip(skip).limit(limit).toArray(),
      db.db('test').collection('login').find(formatId(opts)).count()
    ]).then(value => {
      const [data, count] = value
      resolve({ skip, limit, count, data })
    }).catch(err => {
      throw '查询数据库失败'
    })
  })
}

// 插入一个用户
const insertUser = async (user) => {
  const { username, password } = user
  if (!username || !password) {
    throw 'username and password is required'
  }
  const rlt = await getUsers({ username })
  if (rlt.count) {
    throw 'username is existence'
  }

  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => {
    db.db('test').collection('login').insertOne(formatInsertData(user), (err, rlt) => {
      if (err)
        return reject(err)
      db.close()
      return resolve(rlt)
    })
  })
}

// 更新一个用户
const updateUser = async (whereOpts, updateOpts) => {
  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => { 
    db.db('test').collection('login').updateOne(formatId(whereOpts), {$set: formatUpdateData(updateOpts)}, (err, rlt) => {
      if (err)
        return reject(err)
      db.close()
      return resolve(rlt)
    })
  })
}

// 删除一个用户
// 通过username，username唯一
const removeUser = async (opts) => {
  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => {
    db.db('test').collection('login').deleteOne(formatId(opts), (err, rlt) => {
      if (err)
        return reject(err)
      db.close()
      return resolve(rlt)
    })
  })
}

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  removeUser
}
