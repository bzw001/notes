//暴露工厂函数，每次请求，可以返回新的vue实例
//在纯客户端应用程序汇总，这里创建根Vue实例,直接挂在dom,
//对于服务端渲染，就需要服务端entry文件
import Vue from 'vue';
import App = './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';


export function createApp() {
  //创建router与store实例
  const router = createRouter();
  const store = createStore();
  //同步路由状态(route, state)到store
  sync(store, router);
  const app = new Vue({
    //注入router
    router,
    store,
    //根实例简单的渲染应用程序组件
    render: h => h(App)
  })
  // 暴露app, router和 store
  return {app,router, store};
}