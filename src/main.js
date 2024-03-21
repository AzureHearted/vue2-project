import Vue from "vue";
import App from "./App.vue";
import router from "@/router"; //引入路由配置
import store from "@/store"; //引入vuex仓库
import "@/plugins/element";
import "normalize.css";
import "@/assets/css/base.css"; //引入基础样式
import api from "@/api/index"; // s 引入api
import moment from "moment"; // s 引入Moment.js
//s 引入vue-json-excel(用于将表格数据导出成excel文件)
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel); // z 使用插件vue-json-excel

import Breadcrumb from "@/components/breadcrumb/Breadcrumb.vue"; // s 导入二次封装的面包屑组件
Vue.component("Breadcrumb", Breadcrumb); // s 全局使用该面包屑组件

Vue.prototype.$api = api; // z 将api挂载在vue原型上
Vue.prototype.$moment = moment; // z 将moment.js对象挂载在vue原型上

Vue.config.productionTip = false;

new Vue({
  router,
  store, // w 将vuex仓库添加到vue实例中
  render: (h) => h(App),
}).$mount("#app");
