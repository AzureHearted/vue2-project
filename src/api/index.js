// f 公共的请求方法
import base from "./base"; // z 导入主要接口地址
import axios from "@/utils/request";
import product from "./product"; // z 导入产品管理相关的api

const api = {
  /** upload文件删除接口
   * @param {Object} params
   * @param {string} params.url
   */
  uploadDeleteFile(params) {
    return axios.get(base.uploadDeleteFile, {params});
  },
  /** 获取首页数据统计 */
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  /** 获取首页订单统计信息 */
  orderInfo() {
    return axios.get(base.orderInfo);
  },
  /** 首页折线图数据统计 月销量、月销售额信息 */
  chartInfo() {
    return axios.get(base.chartInfo);
  },
  ...product, // z 使用对象析构的方式导入产品相关api
  /** 获取商品类目信息 */
  itemCategory() {
    return axios.get(base.itemCategory);
  },
  /** 新增一级类目
   * @param {Object} params
   * @param {string} params.name
   * @returns
   */
  insertCategory(params) {
    return axios.get(base.insertCategory, {params});
  },
  /** 更新类目
   * @param {Object} params
   * @param {number} params.id
   * @param {string} params.name
   * @returns
   */
  updateCategory(params) {
    return axios.get(base.updateCategory, {params});
  },
  /** 删除类目
   * @param {Object} params
   * @param {number} params.id
   * @returns
   */
  deleteContentCategoryById(params) {
    return axios.get(base.deleteContentCategoryById, {params});
  },
  /** 新增子类目
   * @param {Object} params
   * @param {number} params.cid
   * @param {string} params.name
   * @returns
   */
  insertItemCategory(params) {
    return axios.get(base.insertItemCategory, {params});
  },
  // f 订单类api
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
};

export default api;
