const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig,{
  mode: 'production',
  entry: {
    app: ["./src/main"]
  },
  output: {
    publicPath: "/",
    filename: "assets/js/[name].[hash].js",
    chunkFilename: "assets/js/[name].[chunkhash].js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
        {
            // 对所有引入的tsx文件进行解析
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                // 自动将所有.vue文件转化为.vue.tsx文件
                appendTsSuffixTo: [/\.vue$/]
            }
        },
       {
        test: /\.js$/,
        include: path.join(__dirname, "..", "src"),
        loader: "babel-loader",
       },
        {
            test: /\.less$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[local]_[hash:base64:8]'
                    }
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'less-loader'
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.[name].css',
      chunkFilename: 'assets/css/[name].[contenthash:12].css'
    })
  ]
});
