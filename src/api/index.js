//f 公共的请求方法
import base from "./base"; //z 导入主要接口地址
import axios from "@/utils/request";
import product from "./product"; //z 导入产品管理相关的api

const api = {
  //f 获取首页数据统计
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  //f 获取首页订单统计信息
  orderInfo() {
    return axios.get(base.orderInfo);
  },
  //f 首页折线图数据统计 月销量、月销售额信息
  chartInfo() {
    return axios.get(base.chartInfo);
  },
  ...product, //z 使用对象析构的方式导入产品相关api
  itemCategory() {
    return axios.get(base.itemCategory);
  },
};

export default api;
