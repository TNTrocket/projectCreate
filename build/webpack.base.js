const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, "..", dir)
}
module.exports = {
  output: {
    path: resolve("dist"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'screens': resolve('src/screens'),
            'components': resolve('src/components'),
            'util': resolve("src/util")
        }
    },
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: path.join('assets', 'img/[name].[hash:7].[ext]')
                }
            },
          {
            loader: "image-webpack-loader",
            options: {
              optipng: {
                optimizationLevel: 7
              },
              gifsicle: {
                interlaced: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              mozjpeg: {
                quality: 65,
                progressive: true
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader"
      }
    ]
  },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ])
    ]
};
