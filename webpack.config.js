/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const configPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, './config.prod.js')
    : path.resolve(__dirname, './config.dev.js');

const CONFIG = require(configPath);

module.exports = {
  devtool: 'source-map',
  mode: CONFIG.webpack.mode,
  entry: './app/js/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        include: path.resolve(__dirname, 'app'),
        use: 'vue-loader',
      },
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, 'app'),
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      vue: 'vue/dist/vue.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProvidePlugin({
      Vue: 'vue',
      CONFIG: configPath,
    }),
    new HtmlWebpackPlugin({
      title: 'Leafy Pi',
      template: './app/views/master.html',
    }),
  ],
  devServer: {
    port: 8080,
    https: false,
    compress: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
