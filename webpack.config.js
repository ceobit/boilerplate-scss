const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './assets/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
      filename: 'style.css',
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: './index.html',
      filename: './index.html',
      minify: {
        collapseWhitespace: true //Минимифицируем index.html
      }
    }),
  ],
  devServer: {
    port: 5490
  }
};