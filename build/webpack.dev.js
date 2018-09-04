const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const baseWebpackConfig = require('./webpack.base')
function resolve(dir) {
    return path.join(__dirname, "..", dir)
}
process.env.NODE_ENV = 'development'

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            "webpack-dev-server/client",
            "webpack/hot/only-dev-server",
            "./src/main"
        ]
    },
    output: {
        publicPath: "/",
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    devServer: {
        hot: true,
        contentBase: resolve("dist"),
        port: 3000,
        host: "127.0.0.1",
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        open: true
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
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
    devtool: "cheap-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'vue-style-loader'
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
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'vue-style-loader'
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
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({hash: false, template: "./index.html"}),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/)
    ]
});
