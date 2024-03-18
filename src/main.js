import Vue from "vue";
import App from "./App.vue";
import router from "@/router"; //引入路由配置
import store from "@/store"; //引入vuex仓库
import "@/plugins/element";
import "normalize.css";
import "@/assets/css/base.css"; //引入基础样式
import api from "@/api/index"; // s 引入api
import moment from "moment"; // s 引入Moment.js

Vue.prototype.$api = api; // z 将api挂载在vue原型上
Vue.prototype.$moment = moment; // z 将moment.js对象挂载在vue原型上


Vue.config.productionTip = false;

new Vue({
  router,
  store, // w 将vuex仓库添加到vue实例中
  render: (h) => h(App),
}).$mount("#app");
