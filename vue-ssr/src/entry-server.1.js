// 导出函数，每次渲染都会重复调用此函数
import { createApp } from './app';
import { resolve } from 'path';
export default context => {
  //有可能是异步路由函数或组件，这里返回promise
  //这样服务器能够在所有内容渲染前已经准备就绪
  return new Promise((rsolve,reject) => {
    const { app, router } = createApp();
    //设置服务端 router的位置
    router.push(context.url);
    //等router将可能的异步组件与钩子函数解析完
    router.onReady( () => {
      const matchedComponents = router.getMatchedComponents();
      //匹配不到路由，执行reject函数，返回404
      if (!matchedComponents.length) {
        return reject({code:404})
      }
      // resolve应用程序实例，以便它可以渲染
      resolve(app);
    },reject)
  })
}