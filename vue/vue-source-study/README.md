#### vue源码目录说明
```
  |- build                         //构建文件
  |- dist 
  |- examples                      //应用实例
  |- flow                          //类型声明 (https://flowtype.org) ,flow可以静态类型检查[Flow is a static type checker for javascript]
  |- test                          //测试文件
  |- src                           //主体源码
    |- entries                     //不同包的构建入口
      |- web-runtime.js            //运行时构建入口,输出 dist/vue.common.js,不包含模板到render函数的编译器
      |- web-runtime-with-compiler.js    //独立构建版本的入口,输出dist/vue.js
      |- web-compiler.js            //vue-template-compiler 的入口文件
      |- web-server-render.js       //vue-server-render的入口文件
    |- compiler                     //编译器代码的存放目录，将template编译为render函数
      |- parser                     //模板字符串转换成元素抽象语法树的代码
      |- codegen                    //抽象语法树（AST）生成render函数
      |- optimizer.js               //分析静态树，优化virtural dom渲染
    |- core                         //通用代码
      |- observer                   //数据观测的核心代码
      |- vdom                       //虚拟dom创建与打补丁的代码
      |- instance                   //vue构造函数设计相关
      |- global-api                 //vue构造函数挂载全局方法或属性
      |- components                 //抽象出来的通用组件
    |- server                       //server-side render相关
    |- platfroms                    //平台特有相关
    |- sfc                          //单文件组件的解析逻辑，用于vue-template-compiler
    |- shared                       //代码库通用

  //Vue 从何而来
  platforms/web/entry-runtime-width-compiler.js——> runtime/index.js——> core/index.js——> instance/index.js
  ```