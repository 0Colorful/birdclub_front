const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8088', //目标接口域名
        changeOrigin: true, //是否跨域, 这条没写的话会调用不了后端接口
        ws: true,
        pathRewrite: {
          '^/api': '' //重写接口
        }
      }
    }, 
  }
})
