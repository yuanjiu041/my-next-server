// 引入Less
const path = require('path')
const withLess = require('@zeit/next-less')

const contextPath = __dirname
module.exports = withLess({
  cssModules: true,
  webpack (config) {
    config.resolve.alias = {
      Components: path.resolve(contextPath, 'client/components'),
      Common: path.resolve(contextPath, 'client/common'),
    }

    return config
  }
})