import axios from "@/utils/request";

// w 环境变量获取api
const apiUrl = process.env.VUE_APP_BASE_URL;

const base = {
  /** 订单列表api */
  getOrderList: apiUrl + "/order/list",
  /** 修改汇总状态api */
  changeListStatus: apiUrl + "/order/changeStatus",
  /** 订单汇总列表获取api */
  orderCollectList: apiUrl + "/order/collect",
  /** 撤销订单汇总api */
  cancelOrderCollect: apiUrl + "/order/cancel",
  /** 订单详情api */
  orderDetail: apiUrl + "/order/list/detail",
};

export default {
  /** 获取订单信息
   * @param {Object} params
   * @param {number} params.page 页码
   */
  getOrderList(params) {
    return axios.get(base.getOrderList, {params});
  },
  /** 修改订单汇总状态
   * @param {Object} params
   * @param {string} params.ids 字符串 (id数组转字符串ids)
   * @example 如要修改id为1、3、8的订单,则将数组[1,3,8]转为字符串"1,3,8"作为ids传入
   */
  changeListStatus(params) {
    return axios.get(base.changeListStatus, {params});
  },
  /** 订单汇总列表获取
   * @param {Object} params
   * @param {string} params.page 页码
   */
  orderCollectList(params) {
    return axios.get(base.orderCollectList, {params});
  },
  /** 撤销订单汇总
   * @param {Object} params
   * @param {number} params.id 汇总订单的id
   */
  cancelOrderCollect(params) {
    return axios.get(base.cancelOrderCollect, {params});
  },
  /** 订单详情api
   * @param {Object} params
   * @param {number} params.id 汇总订单的id
   */
  orderDetail(params) {
    return axios.get(base.orderDetail, {params});
  },
};
