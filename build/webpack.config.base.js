const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css'],
    alias: {
      // https://github.com/GoogleChromeLabs/webpack-libs-optimizations#alias-lodash-es-to-lodash
      'lodash-es': 'lodash',
      vue: 'vue/dist/vue.runtime.esm.js',
      common: path.join(__dirname, '../client/common'),
      components: path.join(__dirname, '../client/components'),
      assets: path.join(__dirname, '../client/assets'),
      utils: path.join(__dirname, '../client/utils'),
      services: path.join(__dirname, '../client/services')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue-router\/|vue-loader\//,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.tpl',
      filename: 'index.html',
      inject: true
    }),
    // https://github.com/GoogleChromeLabs/webpack-libs-optimizations#moment
    new MomentLocalesPlugin()
  ]
}
