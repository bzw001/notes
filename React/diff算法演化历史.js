/**
 * 由于React.js, React-Dom.js, immutable.js,redux.redux-react.react-router等弄在一块导致包很大
 * 出现了一些小型react, 如preact,inferno, react-lite等
 */

 /**
  * 虚拟DOM万变不离其宗的三个属性：type, props, children
  * 虚拟DOM可以加入更多的冗余标识，以帮助diff算法的改良
  */
 /**
  * 最先出现的virtual-dom库，其通过深度优先搜索与in-order tree来实现高效的diff
  * 然后cito.js出现，采用两端同时进行比较的算法，diff算法迅速提高
  * 紧接着kivi.js 在以上基础上，使用key实现移动追踪以及基于key的编辑长度距离算法应用(复杂度为O(n^2))
  * 后来sbabbdom去掉编辑长度距离算法，调整两端算法，可读性提高，
  * 接着vue2.0将snabbdom这个库整合
  */

  /**
   * babel会将JSX这些属性转换为VNode对象，这是虚拟DOM的最小单元，所有虚拟DOM会组成一棵树
   */

   /**
    * 组件的实例本身就很耗性能，官方推荐的页面结构是通过少量的有状态组件控制无状态组件的拜年话，所有状态通过redux在路由进行分发
    */

    /**
     * 去哪儿的Qreact1.0
     * 使用requestAnimationFrame来稳定运行帧数
     * 使用typeNumber代替type类型判断避免bable对type的打补丁操作
     * 使用队列保证生命周期钩子按顺序执行
     * 使用_rerender标识一个组件在一个大的更新中只会被render一次
     */
    
     /**
      * 一些高级功能是比较损耗性能的，如object.freeze,Object.defineProperty
      */