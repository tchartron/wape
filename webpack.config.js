const path = require('path');
const webpack = require('webpack')
const config = require('./src/app/config/build')
const pkg = require('./package.json')
const iframeConfig = require('./src/app/config/iframe')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode: 'production',
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: pkg.name.toLowerCase() + '.js',
    // publicPath: '/assets/',
    library: pkg.name,
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          // presets: ['es2015']
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.html$/,
      //   loader: 'htmllint-loader',
      //   exclude: '/node_modules/',
      // },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      App: path.resolve(__dirname, 'src/app/'),
      Editor: path.resolve(__dirname, 'src/editor/'),
      Components: path.resolve(__dirname, 'src/editor/components')
    }
  },
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  // stats: 'errors-only',
  // stats: 'detailed',
  stats: 'normal',
  plugins: [
    new webpack.BannerPlugin(config.banner),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: pkg.name,
        filename: 'index.html', //default
        templateParameters: {
          'author': pkg.author,
          'desc': pkg.description,
        },
        inject: 'head',
        template: 'src/app/config/webpack-template.html'
    }),
    new HtmlWebpackPlugin({
        title: iframeConfig.title,
        filename: 'iframe.html',
        templateParameters: {
          'bulma': iframeConfig.bulma,
          'css': iframeConfig.css
        },
        inject: false,
        template: 'src/app/config/webpack-iframe-template.html'
    })
  ]
}
