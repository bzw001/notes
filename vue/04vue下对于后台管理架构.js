/**
 * angularjs下暴露出的问题
 * 1、本身angularjs的学习成本较高，对于成员来讲应用起来稍许复杂
 * 2、本身的脏检查机制限制了angularjs的性能
 * 3、angularjs侵入感太强
 * 
 * vue下带来的好处：
 * 1、本身前端是个变化非常快的技术，一定程度下拥抱新技术与新特性对于团队成长来说有裨益
 * 2、可以结合es6以及vue的完全组件化深入当前的模块化与组件化开发模式
 * 3、vue文档清晰，上手容易，对于中小型项目来讲能够快速开发。
 */

 /**
 * vue下的架构
 * 1、技术选型
 * 2、文件目录组织
 * 3、应用布局以及组件开发方式
 */

 /**
  * vue下的技术结构
  1、视图框架：vue              视图部分，骨架
  2、路由:vue-router            路由
  3、组件通信与状态管理：vuex    通信机制
  4、数据请求：axios            数据请求
  5、组件库：element-ui         更加注重业务层 
  6、脚手架：vue-cli            构建方便
  7、单元测试：karma            稳定
  关注的点：方便，快捷，稳定，易于维护
*/

   /**
    * 文件夹组织
      |-src
          |-asserts           //公用资源
            |-componentlib    //共享组件库，包含应用级组件
            |-common          //公用img,css
              |-css
              |-img
              |-lib           //项目内抽取出来的功能js
          |-components        //项目内公用组件
            ...
            |-clibUpdate.js
            |-clib.json
          |-pages             // 具体功能页
            |-layout          //页面布局
              |-layout.vue
              |-header        //header组件
                |-header.less //当html部分或者css部分样式过多时，可以另外使用单文件
                |-header.html
                |-header.vue
              |-aside
              |-footer.vue
            |-gardenManger    //例：果园管理
          |-router            //路由
            |-dev.js          //开发与线上发布的区别，如是本地测试不启用懒加载
            |-prod.js
            |-index           //路由配置文件，设置常态路由与动态路由两部分
          |-store             //vuex配置文件，可以设置多个模块来控制权限，用户操作，应用相关状态等
          |-static            //静态文件，该文件夹下的文件不会经过webpack打包
          |-App.vue           //app根组件
          |-main.js           //应用启动入口
    */
  

 /**
  * vue下的一般的应用的迭代开发方式:
    完全的组件化开发  
    应用骨架与布局搭建好后，先对功能与页面了解，对页面分切组件，根据功能考虑其能否被复用或从共享组件库复用，切好组件后，
    思考是否需要涉及vuex管理，然后是组件需要与外部通信哪些数据，写路由，定义组件。
  */
 /**
  * 页面划分组件的粒度是怎样的？页面全部组件化，还是部分组件化？
    完全遵照组件化开发的方式。
    应用里的一个功能点即是一个组件，页面功能由组件构成
    首先将页面进行功能划分，将功能抽象成组件，对于公共功能抽象成公共组件，对于项目级组件放到共享组件库
    在每次版本迭代时，都需要进行一次需求讨论，讨论关于各个页面的组件划分以及相应的通信机制
  */

  /**
   * 路由组织相比angularjs下的结构的变动
   * angularjs下路由的设置分布在每一个模块中，但是存在一个问题，引入权限控制后，某个路由出现问题，加大了查找问题的难度
   * vue下路由在一个地方直接管理
   */
  
   /**
    * 与之前我们angularjs框架开发下的比较：
      1、指令方面大都差不多。
      2、vue没有注入服务这一概念，服务可以建立util工具js与Vue实例结合代替
      3、路由方面差不多。
      4、文件组织方面， angularjs对于一个页面其实是按模块来划分的，而vue是以组件
      6、双向绑定，angularjs在websocket一些场景需要手动触发脏检查，同时本身检查机制限制了性能，
         而vue对于一些对象属性变更需要调用vue的set的方法，同时可以设置$watch。由于是基于getter与setter机制，
         其检查的体量要比angularjs轻，利于性能
      7、一些全局状态的存储于变更通知，angularjs需要调用结合服务以及广播机制，而vue下可以结合Vuex易于管理，
      同时其本身也可以使用$emit与$on向父组件发送信息
      8、在当前的websocket的通知场景下，可以结合vuex对于自检，参比，固件更新，设备状态更新等实时场景，
         我们可以在vuex进行统一管理，不需要走angularjs的全局广播与监听机制，全局广播功能被vuex的状态变更更新取代。
         像这种websocket异步场景可以直接统一管理。
      9、构建工具，angularjs下使用的是webpack，vue下使用了集成了webpack的vue-cli
    */

    /**
     * 与angular2下的比较
     * angular2学习曲线复杂，es6->ts->angular2
     * 其核心来自于core。检查机制来源于zone.js。这个并不是由google直接维护
     * 定义的功能也很多，适合应用与大型复杂应用
     * 也是组件化方法方式，还加入了模块的概念
     * 但是定义与配置比vue复杂
     */

/**
 * 哪些状态需要使用vuex管理？哪些不用
 * 不需要vuex管理：
 *   1、单纯的父子组件通信
 *   2、抽取的应用公共组件（减少耦合性）
 * 可以vuex管理：
 *   1、应用的公共状态，多个组件都应用到
 *   2、横跨多个组件的组件通信
 *   3、比较复杂的常见的异步交互场景与组件通信场景
 */


  /**
   * 会常用到的es6知识：
   * 块级作用域，变量的解构赋值，对象数组新增的一些方法，promise
   * 应用一些特殊场景：状态机generator,decorator修饰符，class类
   */