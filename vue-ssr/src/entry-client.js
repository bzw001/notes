//只需要创建应用程序，并将其挂载到dom中
import Vue from 'vue';
import { createApp } from './app';
const {app, router, store} = createApp();

// //客户端特定指引逻辑
// const {app} = createApp();
// //App.vue模板根元素具有 id = "app"
// app.$mount('#app');
// 如果存在window.__INITIAL__STATE__状态，之前已经服务器将其嵌入到了html,同时在客户端的store也应该获取到状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options;
    if (asyncData) {
      //将获取数据操作给promise
      //这样在数据就绪后，可以运行this.dataPromise.then()执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  },
  //当路由组件重用时，如user/1到user/2时，也需要嗲用asyncData
  beforeRouteUpdate (to, from ,next) {
    const {asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next();
    }
  }
})
router.onReady(() => {
  //添加路由钩子函数，处理asyncData
  //初始路由resolve执行
  //这样不会二期预取已有的数据
  //使用 router.beforeResolve，以确保所有异步组件都resolve
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    //只关心没有被渲染的组件
    //可以进行对比，找出两个匹配列表的差异组件
    let diffed = false;
    const activated = matched.filter（ (c, i) => {
      return diffed || (diffed = (prevMatched[i] !==c))
    }）
    if (!activated.length) {
      return next();
    }
    //如果存在没有被resolve的组件
    // 这里如果有加载执行器(loading indicator)， 就触发
    Promise.all(activated.map( c => {
      if (c.asyncData) {
        return c.asyncData( {store, route:to})
      }
    })).then(() => {
      //停止加载指示器
      next();
    }).catch(next);
  })
  app.$mount('#app');
})