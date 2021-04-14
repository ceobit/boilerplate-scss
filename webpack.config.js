const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'assets'),
  entry: './app.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [{
      test:/\.(s*)css$/,
      use: [
        miniCss.loader,
        'css-loader',
        'sass-loader',
      ]
    }]
  },
  plugins: [
    new miniCss({
      filename: '[name].[hash].css',
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: '[name].[hash].html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin()
  ],
};