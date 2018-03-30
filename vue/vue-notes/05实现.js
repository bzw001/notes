/**
 * 当前权限码的机制下，vue如何实现权限机制
 * 1、beforeEach下得到数据权限后，dispatch路由
 * 2、根据用户权限数据即权限码映射动态具体路由，动态更新注册路由
 * 3、侧边栏可以根据用户注册的路由实时显示
 * 4、对于非路由的功能视图，添加指令检查是否有权限
 * 5、设置权限开关，关闭后可以加载所有功能
 */
//参考：http://panjiachen.github.io/vue-element-admin/#/icon/index