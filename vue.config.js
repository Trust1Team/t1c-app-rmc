const webpack = require('webpack')

module.exports = {
  parallel: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Popper: '@popperjs/core'
      })
    ]
  }
}
