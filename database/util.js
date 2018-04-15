const MongoClient = require('mongodb').MongoClient
const mongoUrl = require('../config/common').mongoUrl

// 链接数据库，用await的形式获取DB对象
const connectDB = (url = mongoUrl) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err)
        reject(err)
      resolve(db)
    })
  })
}

const formatInsertData = (opts) => {
  return {
    ...opts,
    createdTime: Date.now()
  }
}

const formatUpdateData = (opts) => {
  return {
    ...opts,
    updateTime: Date.now()
  }
}

module.exports = {
  connectDB,
  formatUpdateData,
  formatInsertData
}
