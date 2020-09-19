const path = require('path');
const webpack = require('webpack')
const config = require('./src/build/config')
const pkg = require('./package.json')

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
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'eslint-loader',
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
      // {
      //   test: /\.js$/,
      //   include: [
      //     path.resolve(__dirname, 'src')
      //   ],
      //   exclude: [
      //     path.resolve(__dirname, 'node_modules')
      //   ],
      //   loader: ['babel-loader', 'eslint-loader'],
      //   options: {
      //     // presets: ['es2015']
      //     presets: ['@babel/preset-env']
      //   }
      // },
      {
        test: /\.html$/,
        loader: 'htmllint-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
    new webpack.BannerPlugin(config.banner)
  ]
}
