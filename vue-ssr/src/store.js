import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
//假定已经存在一个可以返回Promise的通用api
import {fetchItem} from './api';

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', {id:item})
        })
      }
    },
    mutations: {
      setItem (state, {id, item}) {
        Vue.set(state.items, id, item);
      }
    }
  })
}