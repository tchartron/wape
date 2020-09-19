const path = require('path');
const webpack = require('webpack')
const config = require('./src/build/config')
const pkg = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // mode: 'production',
  entry: './src/build/build.js',
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
      {
        test: /\.html$/,
        loader: 'htmllint-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'vue-style-loader'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      Build: path.resolve(__dirname, 'src/build/'),
      Editor: path.resolve(__dirname, 'src/editor/')
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
    new VueLoaderPlugin()
  ]
}
