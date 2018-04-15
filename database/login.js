// 连接mongoDB获取数据，通过promise的形势来封装

const util = require('./util.js')
const { connectDB, formatInsertData, formatUpdateData } = util

// 根据username获取一个用户
const getUsers = async (opts) => {
  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => {   
    db.db('test').collection('login').find(opts).toArray((err, rlt) => {
      if (err)
        reject(err)
      db.close()
      resolve(rlt)
    })
  })
}

// 插入一个用户
const insertUser = async (user) => {
  const { username, password } = user
  if (!username || !password) {
    throw 'username and password is required'
  }
  const matchRlt = await getUserByUsername(username)
  if (matchRlt.length) {
    throw 'username is existence'
  }

  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => {
    db.db('test').collection('login').insertOne(formatInsertData(user), (err, rlt) => {
      if (err)
        reject(err)
      db.close()
      resolve(rlt)
    })
  })
}

// 更新一个用户
const updateUser = async (whereOpts, updateOpts) => {
  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => { 
    db.db('test').collection('login').updateOne(whereOpts, {$set: formatUpdateData(updateOpts)}, (err, rlt) => {
      if (err)
        reject(err)
      db.close()
      resolve(rlt)
    })
  })
}

// 删除一个用户
// 通过username，username唯一
const removeUser = async (username) => {
  const db = await connectDB().catch((err) => {throw err})
  return new Promise((resolve, reject) => {
    db.db('test').collection('login').deleteOne({username: username}, (err, rlt) => {
      if (err)
        reject(err)
      db.close()
      resolve(rlt)
    })
  })
}

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  removeUser
}
