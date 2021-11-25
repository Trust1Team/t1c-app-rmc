const webpack = require('webpack')

module.exports = {
  parallel: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        cash: 'cash-dom',
        Popper: '@popperjs/core'
      })
    ]
  }
}
