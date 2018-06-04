const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    stats: 'errors-only',
    compress: true,
    hot: true,
    historyApiFallback: {
      rewrites: [{from: /^\//, to: '/index.html'}]
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
