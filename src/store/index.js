import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; // w vuex保持化插件

import account from "./modules/account";
import product from "./modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuIsCollapse: false, //w 用于控制左侧菜单收缩
  },
  getters: {},
  mutations: {
    /** 改变菜单收缩状态 */
    changeMenuCollapse(state, bool) {
      state.menuIsCollapse = bool;
    },
  },
  actions: {
    /** 清除信息 */
    clearInfo({commit}) {
      // 提交 account 模块的 mutation 来清除信息
      commit("account/clearInfo");
      commit("product/clearInfo");
    },
  },
  modules: {
    account, // 使用account的vux模块
    product, // 使用product的vux模块
  },
  plugins: [
    createPersistedState({
      key: "vuex-state", // 设置存储的键名
      paths: ["account", "product"], //指定要保持化的namespace
      // 只保存特定的状态数据，例如只保存 user 模块的数据
      // reducer(state) {
      //   user: state.user
      // },
      reducer(state) {
        return state;
      },
    }), // 使用默认配置将状态保存到 localStorage
  ],
});
