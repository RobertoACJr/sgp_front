const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 16900,
    https: false,
    hot: true,
    allowedHosts: ['ifmscx.pro.br', 'localhost'],
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
  },

  configureWebpack: {
    entry: "./src/main.js",
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
    },
    plugins: [
      new (require('webpack')).DefinePlugin({
        'process.env.OVERLAY': JSON.stringify(false)
      }),
    ],
  },

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  }
})
