import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      item: []
    },
    mutations: {
      setItem(state, data) {
        state.item.push(data);
      }
    },
    actions: {
      fetchItem({ commit }) {
        commit("setItem", { id: 1, item: "test" });
      }
    }
  });
}
