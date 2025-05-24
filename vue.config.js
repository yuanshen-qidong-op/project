const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081 // 将端口设置为8081
  },
  chainWebpack: (config) => {
    config
      .plugin('define')
      .tap((args) => {
        args[0] = {
          ...args[0],
          // 定义Vue特性标志
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false
        }
        return args
      })
  }
})