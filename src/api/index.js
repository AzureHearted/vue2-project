//f 公共的请求方法
import base from "./base";
import axios from "@/utils/request";

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
};

export default api;
