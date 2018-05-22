const ExtractTextPlugin = require('extract-text-webpack-plugin');

//css提取应该只用于生产环境
//在开发环境依然可以热重载

const isProduction = process.env.NODE_ENV == 'production';


module.exports = {
  //..
  module: {
    rules:[
      {
        //如果想从js中引入css,需要使用vue-style-loader 替代style-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          //enable css extraction
          extractCSS: isProduction
        }
      }
    ]
  },
  plugins: isProduction
      ? [new ExtractTextPlugin({ filename: 'common.[chunkhash].css'})]
      : []
}