//使用客户端清单
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-ssr-render/client-plugin');

module.exports = merge(baseConfig, {
  entry: '/path/to/entry-client.js',
  plugins: [
    //这里将webpack运行时分离到一个引导chunk中
    //这样可以在之后正确的注入异步chunk
    //同时为应用程序vendor代码提供了更好的缓存
    new webpack.optimize.CommonsChunkPlugin( {
      name: 'manifest',
      minChunks: Infinity
    }),
    //在插件在输出目录中生成'vue-ssr-client-minifest.json
    new VueSSRClientPlugin()
  ]
})