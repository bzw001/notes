//只需要创建应用程序，并将其挂载到dom中
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
router.onReady(() => {
  app.$mount('#app');
})