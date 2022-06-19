let { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {
    proxy: {
      'api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^api': ''}
      }
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './'
})
