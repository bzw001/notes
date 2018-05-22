// 导出函数，每次渲染都会重复调用此函数
import { createApp } from './app';
export default context => {
  //有可能是异步路由函数或组件，这里返回promise
  //这样服务器能够在所有内容渲染前已经准备就绪
  return new Promise((rsolve,reject) => {
    const { app, router, store } = createApp();
    //设置服务端 router的位置
    router.push(context.url);
    //等router将可能的异步组件与钩子函数解析完
    router.onReady( () => {
      const matchedComponents = router.getMatchedComponents();
      //匹配不到路由，执行reject函数，返回404
      if (!matchedComponents.length) {
        return reject({code:404})
      }
      //对所有匹配到的路由组件调用asyncData
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route； router.currentRoute
          })
        }
      })).then( () => {
        //所有预取钩子 resolve后
        // store现在已经填充应用程序所需的状态
        //将状态附加到上下文
        // 选项 template选项用于 render时
        // 状态将序列化为 `window.__INITIAL_STATE__`,并注入到HTML
        context.state = store.state;
        // resolve应用程序实例，以便它可以渲染
        resolve(app);
      }).catch(reject)
    },reject)
  })
}