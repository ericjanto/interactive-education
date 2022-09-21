const { merge } = require('webpack-merge')

const paths = require('./paths.cjs')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'interactive-video-component.js',
  }
})