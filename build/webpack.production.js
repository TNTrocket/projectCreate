const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require('./webpack.base')

process.env.NODE_ENV = 'production'

module.exports = merge(baseWebpackConfig,{
  mode: process.env.NODE_ENV,
  entry: {
    app: ["./src/main"]
  },
  output: {
    publicPath: "/",
    filename: "assets/js/[name].[hash].js",
    chunkFilename: "assets/js/[name].[chunkhash].js"
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
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
                    loader: 'resolve-url-loader'
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
                },
                {
                    loader: 'resolve-url-loader'
                }
            ]
        }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.[name].css',
      chunkFilename: 'assets/css/[name].[contenthash:12].css'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.html"
    })
  ]
});
