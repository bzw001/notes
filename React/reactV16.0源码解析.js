/**
 * v16.0使用Fiber异步渲染架构进行了重写,进化点：
 * 1、体积更小
 * 2、服务端渲染速度大幅提升
 * 3、更responsive的界面
 */

 /**
  * Filber概念简介
  * 1、Reconciler 即Vitual Dom, 用于计算新旧View的差异
  * 2、Renderer表示和平台相关的代码,将View渲染到不同平台
  * 
  * Reconciliation表示Fiber的update, 产出effect list(更新视图所需要的操作),可以当作第一阶段, 这个阶段是可以打断，重新生成effect list
  * effect list 再commit 后才会生效,commit表示第2阶段, 表示view到具体视图(如DOM)的步骤,这个阶段时长小，是同步的。
  * 
  * React内部有事务的概念，之前与渲染相关的事务时连续的，一旦开始就会执行完。
  * 现在事务由Fiber的更新组成，可以断断续续更新Fiber，最后commit变化。
  */

  /**
   * 一个React Element不一定就对应一个Fiber?
   * dom diff 时，会出现新旧Fiber, 一个待更新的组件最多会对应两个Fiber
   */

   /**
    * Fiber的一些重要属性
    *  Fiber节点构成了一颗单链表形式的树
    * child执行第一个子节点，sibling属性分别指向相邻的兄弟节点
    */
   {
     tag: TypeOfWork,  // Fiber 类型
     alternate: Fiber|null // Fiber更新时克隆出的景象fiber, 对fiber的修改会标记在这个fiber
     return: Fiber| null, //指向Fiber树中的父节点
     child:Fiber | null, //指向第一个子节点
     sibling: Fiber | null, // 指向兄弟节点
     effectTag: TypeOfSideEffect，// side effect 类型
     nextEffect: Fiber | null, // 单链表结构，方便遍历fiber树上有副作用的节点
     pendingWorkPriority: PriorityLevel, //标记子树上待更新任务的优先级
   }


/// 从setState开始入手
ReactComponent.prototype.setState = function(partialState, callback) {
  invariant(typeof partialState === 'object' || ...);

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
/**
 * setState -> this.updater.enqueueSetState .updater由reconciler提供
 */

 // setState 的流程基本React 15的流程基本是一样
 const updater = {
   isMounted,
   enqueueSetState(instance, partialState, callback){
     const fiber = ReactInstanceMap.get(instance); // 拿到React组件实例对应的fiber
     const priorityLevel = getPriorityContext(fiber,false)// 拿到fiber的优先级
     callback = callback === undefined ? null : callback;

     if(__DEV__) {
       warnOnInvalidCallback(callback, 'setState');
     }
     addupdate(fiber, partialState, callback, priorityLevel);// 向队列推入需要更新的fiber
     scheduleupdate(fiber, priorityLevel); // 调用scheduleUpdate触发调度器调度一次新的更新
   }
   ...
 }

 /// Fiber架构有哪些不同的地方？

 /**
  * 向Fiber的更新队列加入一次更新
  * -> insertUpdate
  */
 function addUpdate(
   fiber:Fiber,
   partialState: PartialState<any,any> | null,
   callback: mixed,
   priorityLevel:PriorityLevel
 ):void {
   const update = {
     priorityLevel,
     partialState,
     callback,
     isReplace: false,
     isForced: false,
     isTopLevelUnmount: false,
     next: null,
   };
   insertUpdate(fiber, update);
 }

 /// 两个类型, Update与UpdateQueue
 /// 单向链表
 type UpdateQueue = {
   first: Update |null, 
   last: Update | null,
   hasForceUpdate: boolean,
   callbackList: null | Array<Callback>,

 }
 type Update = {
   priorityLevel: Prioritylevel,
   partialState: PartialState<any, any>,
   callback: Callback | null,
   isReplace: boolean,
   isForced: boolean,
   isTopLevelUnmount: boolean,
   next: Update | null,
 }

 /// React Element 更新时会有current fiber与alternate fiber(working in progress fiber)
 /// 两个fiber都会有一个Update Queue
 /// 两个Queue里面的item引用时相同的
 /// working in progreds fiber 会在更新完一个队列项后将其从队列中移除,
 /// 更新完成之后,working in progress fiber会取代新的current fiber
 /// 更新中断(有更优先级的更新插入),curernt fiber的update queue可以作为备份，是之前的中断的更新可以重新开始

 /**
  * scheduleUpdate
  * -> scheduleUpdateImpl(fiber, priorityLevel, false)
  * 会根据fiber向上搜索父节点, React的schedule的更新都是在Host上更新的，
  * 其上面会有isScheduled的flag标致是否这个fiber树等待更新, 还有nextScheduledRoot指针
  * 指向待更新的HostRoor，构成一个链表的结构
  *   优先级为SychronousPriority 则更新将同步触发,直接调用performWork处理update
  *   优先级为TaskPriority,那upadte一般在batchedUpdates中触发
  *   其他优先级的update将时异步的，使用scheduleDeferredCallback让浏览器空闲时候触发一次更新
  */

  /**
   * performWork
   *   刷新待更新队列,执行待更新的事务
   * 大部分代码时错误处理代码,与React 16新特性(Error Boundaries)相关
   * 需要关注的函数: workLoop  React 更新pendingWork队列的主循环
   *          scheduleDeferredCallback 函数会在未来安排一次更新，来处理workLoop中没有做完的事情
   */

   /**
    * workLoop
    *  根据优先级及deadline来commit工作，支持处理之前未commit操作与同步的reconsiliation
    * 一次re-render 分为reconsiliation与commit
    * 如果update不能在deadline之前commit, 就会被标记为pendingCommit,所以在一次workLoop开始
    * 先检查上一次workLoop有咩有留下的pedningCommit, 有则立即提交
    * 如果没有pendingCommmit, nextUnitWork,就会resetNextUnitWork初始化nextUnitOfWork
    */

    /**
     * scheduleDeferredCallback
     * 每个renderer初始化时需要传入当前平台相关的配置，也就是一个HostConfig实例,才能拿到自定义的Reconciler
     */
    /// ReactDom的入口中:
    scheduleDeferredCallback: ReactDomFrameScheduling.rIC,

    /// React Native的入口中:
    scheduleDeferredCallback: global.requestIdleCallback


/**
 * Cooperative Scheduling && requestIdleCallback
 * windowRequestIdleCallback可以指定在浏览器一帧的空闲时间执行函数, 接受IdleDeadLINE类型的参数
 * IdleDeadline有timeRemaing方法
 * 
 * React 主要利用了流啊冷凝器提供的requestIdleCallback API来实现这一特性
 * 相比setTimeout这样的API调用callback, requestIdleCalklback带来的Cooperative Scheduling让开发着让浏览器在空闲时间调用callback
 * deadline中的timeRemaing的最大值是50ms，以免浏览器长期空闲时，callback的任务一一直执行，使得UI不能及时响应Y用户输入
 * 
 * 如果浏览器没有实现requestIdleCallback, 就使用一个polyfill ，使用requestAnimationFrame实现
 *  1、预估一个比较低的frame rate,从requestAnimationFrame获取一帧开始，时间戳与触发message事件
 *  2、postMessage在layout paint 和composite之后调用，deadline通过fframe rate-rafTime可以得到
 * |frame start time                                        deadline|
 * [requestAnimationFrame] [layout] [paint] [composite] [postMessage]
 * 根据时间戳获取两帧的准确frame rate, 动态调整当前帧的frame rate
 */

 /**
  * 默认优先级
  * 一次更新时同步还是异步是由优先级决定的，那么怎么从setState来schedule的一次update的优先级呢?
  * -> getPriorityContext
  *   同步渲染的默认优先级时SynchronousPrioroty
  * 在React 16中，异步渲染默认时关闭的。用户代码的优先级是同步的
  */

  /**
   * performUnitOfWork
   * reconcilation工作首先调用performUnitOfWork,做reconcilation工作
   * 调用commitAllWork进入commit阶段,将reconcilation结果真正应用到DOM中
   *  一个'work'被分解成了begin与complete两个阶段完成
   *  beginWork ： 根据fiber节点不同的tag,调用对应的update方法，，相当于入口函数
   *    具体的update函数：
   *      updateClassComponent && updateHostComponent
   */

   /**
    * UpdateClassComponent
    *   classComponent对应的是React组件实例
    * a、如果current 为null, 意味着当前的update是组件第一次渲染，需要调用constructClassInstance构建组件实例
    *   、并且会调用componentWillMount声明周期方法，并且初始化组件的updateQueue
    * b、不然使用updateClassInstance，如果新老props不一致，会调用componentWillReceiveProps声明周期方法(16.6.3已经标记为不安全)
    *    调用checkShouldComponentUpdate，返回值为shouldUpdate。如果没有定义，则shouldUpdate默认为true
    * c、如果shouldUpdate为false。则返回，不然调用实例的render fucntion 渲染出children,然后
    *   调用reconcileChildren对新老子节点进行diff
    */
   /**
    * updateHostComponent
    *  主要是低矮用reconcileChildren对子节进行diff, 其没有生命周期函数需要处理
    */

    /**
     * reconcileChildren  即virtual DOM diff
     * -> reconcileChildrenAtPriority (内部三个分支)
     * a、首次渲染，-> mountChildFiberInPlace创建子节点的fiber实例
     * b、新老fiber对比-> reconcileChildFibers
     * c、如果前一次reconciliation过程被打断，则复用之前的工作-> reconcileChildFibersInPlace
     * 上面三个函数是通过不同参数组合的同一个函数->ChildReconciler(shouldClone, shouldTrackSideEffects)
     *  其最终返回的函数是reconcileChildFibers，这个函数实现了对子fiber节点的reconciliation
     */

     /**
      * reconcileChildFibers
      * React的reconcile算法采用的是同层遍历比较，reconcile算法的核心是如何diff两个子节点数组
      * 根据newChild 的类型调用不同的方法:
      * 1、reconcile单个元素, 如果key与type相同，复用fiber,删除多余元素(currentFirstChild的sibling)
      *   如果不同，调用createFiberFromElement返回新创建的
      * 2、如果是string, reconcileSingleTextNode
      * 3、如果是array, reconcileChildrenArray
      * 4、如果为空，deleteRemainingChildren删除老的子元素
      */
 /**
  * diff两个子节点数组
  * reconcileChildrenArray
  * fiber树是单链表结构，没有子节点数组这样的数据结构，也就没有可以供两端同时比较的尾部游标
  * 从而智能从头部比较:
  *   1、从头部遍历，第一次遍历新数组，对上了，就新老index ++ ，比较新老数组那些元素是一样的。
  *    通过updateSlot,比较key,如果是同样的就update, 如果是同样的就Update,
  *   2、第一次遍历完后:
  *     1、新数组遍历完，老数组没完，就将老数组剩余的fiber删除
  *     2、老数组遍历完，新数组没完，将新数组剩下的都插入
  *     3、如果都不是，则将新老数组元素按照key放入map里，然后遍历新数组，插入老数组的元素，这是移动的情况、
  *     4、最后再删除没有被上述情况涉及的元素
  */

  /**
   * completeUnitWork
   * 是complete阶段的入口，complete阶段作用是在一个节点diff完成之后，进行收尾工作，
   * 主要是更新props和调用生命周期方法等。 将当前子树的effect list插入到HostRoot的effect list中
   */

   /**
    * completeWork
    * 完成reconciliation阶段得扫尾工作，重点对HostComponent的props进行diff,并标记更新
    */

  /**
   * reconciliation阶段
   * 主要负责产出effect list.reconcile的过程相当于纯函数，输入fiber节点，输出effect list.
   * side-effects是在commit阶段被应用到UI中的，由于纯函数的可预测性，我们可以随时中断reconciliation阶段执行
   * ，不用担心side-effects让组件状态和实际UI产生不一致。
   * commit阶段有点像GIT的commit概念，缓冲区得代码改动只有在commit之后才会被添加到GIT的Object store中
   */

   /**
    * commit阶段
    * commitAllWork
    *   1、prepareForCommit 做一些DOM事件相关的设置
    *   2、commitAllHostEffects。 会遍历当前fiber树的effect list, 对fiber的插入,更新, 删除以及ref的删除做处理
    *     根据effectTag做不同的处理，如对Deletion这个effectTag会调用commitDeletion，其会递归的将子节点从fiber树上移除，对节点
    *     上存在的ref做detach,最后调用componentWillUnmount生命周期钩子。
    *     最后调用renderer传入的平台相关方法removeChild和removeChildFromContainer更新UI
    *     插入操作，update操作等都会类似的操作
    *   3、commitAllLifeCycles。再次遍历effect list。依次在每个effect上调用commitAllLifeCycles。
    *     如果effet发生在ClassComponent，就会调用实例的componentDidMount和componentDidUpdate
    *     还会对HostComponent调用commitMount方法，可以在renderer一个节点后做一些操作。
    *     如input的auto-focus
    */

    /**
     * 生命周期方法是在reconciliation和commit阶段中调用
     *   render/reconciliation:
     *      componentWillMount
     *      componentWillReceiveProps
     *      shouldComponentUpdate
     *      componentWillUpdate
     *   commit:
     *      componentDidMount
     *      componentDidUpdate
     *      componentWillUnmount
     */

     /**
      * reconciliation 与commit阶段调用函数
      * workLoop:
      *   performUnitOfWork   reconciliation入口
      *   commitAllWork     commit入口
      * performUnitOfWork:
      *   begeinWork:
      *     updateClassComponent
      *     reconcileChildren
      *   completeUnitWork
      *     completeWork
      * commitAllWork:
      *   commitAllHostEffects
      *   commitWork/commitPlacement/commitDeletion
      */

      /**
       * 异步渲染:
       * 当前的渲染虽然是在一个tick中完成的，但是未来React会将渲染的时机给用户掌控。
       * 用户可以主动调用commit来让组件继续渲染。
       * 因为reconcile是没有副作用的
       */

       //// 在React上，看到了一些借鉴自操作系统中的设计，Fiber可以看作是一个轻量级的线程，有自己的数据，也有优先级
      //// 的分别。React能调度fiber使得优先级高得任务优先执行，同时保证低优先级得任务会在未来一段时间执行完毕。
      //// 在diff算法得设计上，React借鉴了社区得经验。