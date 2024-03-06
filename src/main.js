import Vue from "vue";
import App from "./App.vue";
import router from "@/router"; //引入路由配置
import store from "@/store"; //引入vuex仓库
import "@/plugins/element";
import "normalize.css";
import "@/assets/css/base.css"; //引入基础样式
import api from "@/api/index"; //f 挂载api

Vue.prototype.$api = api;

// import * as echarts from "echarts";//f 引入echarts
// Vue.config.$echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
