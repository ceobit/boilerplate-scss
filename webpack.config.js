const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'assets'),
  entry: './app.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: miniCss.loader,
          },
          'css-loader',
          'resolve-url-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(ttf|woff2|woff)$/,
        use: {
          loader: 'file-loader?name=./fonts/[name].[ext]',
          options: {
            esModule: false,
          },
        },
      },
      {// compress images
        test: /\.(png|jpg|gif|ico|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              esModule: false
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new miniCss({
      filename: '[name].[hash].css',
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets/images/img'),
          to: path.resolve(__dirname, 'dist/images'),
          force: true,
        },
      ],
    }),
  ],
};