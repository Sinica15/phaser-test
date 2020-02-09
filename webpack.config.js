const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const express = require("express");

module.exports = {
  entry: {
    app: './src/index.js',
    'production-dependencies': ['phaser']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  // devServer: {
  //   contentBase: path.resolve(__dirname, 'build'),
  // },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
//    open: true,
    port: 9000,
    before: function (app, server) {
      app.use("/api", express.static(path.join(__dirname, "data")));
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'build')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'production-dependencies',
    //   filename: 'production-dependencies.bundle.js'
    // }),
  ],
};
