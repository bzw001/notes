//可以在Vue应用程序中，对客户端与服务器复用相同的路由配置
//给每一个请求一个新的router实例
// import Vue from 'vue';
// import Router from 'vue-router';

// Vue.use(Router);
// export function createRouter () {
//   return new Router({
//     mode: 'history',
//     routes: [
//       //...
//     ]
//   })
// }

//异步路由组件配置
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {path: '/', component: () => import('./components/Home.vue')},
      {path: '/item/:id', component: () => import('./components/Item.vue')}
    ]
  })
}