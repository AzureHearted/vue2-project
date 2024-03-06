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
};

export default api;
