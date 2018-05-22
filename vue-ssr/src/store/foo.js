export default {
  namespaced: true,
  //state必须是一个函数,这样可以实例化该模块
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({ commit } => commit('inc'))
  },
  mutations: {
    inc: state => state.count++
  }
}