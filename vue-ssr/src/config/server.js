const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-render/server-plugin')

module.exports = merge(baseConfig, {
  entry:'/path/to/entry-server.js',

  //允许webpack以node使用方式 处理动态导入
  //同时在编译vue组件时，告知vue-loader输送面向服务器代码
  target: 'node',
  //对bundle renderer提供source map支持
  devtool: 'source-map',
  //告知server bundle使用 Node风格导出模块

  output: {
    libraryTarget: 'commonjs2'
  },

  //外置应用程序依赖模块，使用服务器构建速度更快
  //生成较小的bundle文件

  externals: nodeExternals( {
    //不要外置话webpack 需要处理的依赖模块
    //可以添加更多的文件类型，例如.vue文件，sass文件
    //还可以将修改'global' 的依赖模块列入白名单,
    whitelist: /\.css$/
  }),
  //将服务器整个输出
  // 构建单个JSON文件的插件
  // 默认文件名为 vue-ssr-server-bundle.json ,生成的文件只要传递给createBundkeRender
  plugins: [
    new VueSSRServerPlugin()
  ]
})
