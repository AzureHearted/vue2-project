import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; // w vuex保持化插件

import product from "./modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    product: product,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage, // 更改存储位置为 sessionStorage
      key: "product-vuex-state", // 设置存储的键名
      // 只保存特定的状态数据，例如只保存 user 模块的数据
      // reducer(state) {
      //   user: state.user
      // },
      paths: ["product"],
      reducer(state) {
        return state;
      },
    }), // 使用默认配置将状态保存到 localStorage
  ],
});
