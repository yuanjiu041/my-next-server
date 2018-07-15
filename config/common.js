const os = require('os')

const mongoUrl = 'mongodb://localhost:27017'
const apiPrefix = '/yx/api'
const serverIp = os.networkInterfaces().en0.filter(item => item.family === 'IPv4')[0].address

module.exports = {
  mongoUrl,
  apiPrefix,
  serverIp
}
