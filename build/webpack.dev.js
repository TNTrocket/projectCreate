const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require('./webpack.base')
function resolve(dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            "webpack-dev-server/client",
            "webpack/hot/only-dev-server",
            "./src/main",
            './mocks/index',
            './mocks/console'
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
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/wechat-api': 'http://10.250.90.93:8081/'
        },
        open: true,
        host:'0.0.0.0'
    },
    devtool: "cheap-eval-source-map",
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
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader",
            // },
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
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
