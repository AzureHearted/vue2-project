// f 公共的请求方法
import base from "./base"; // z 导入主要接口地址
import axios from "@/utils/request";
import product from "./product"; // z 导入产品管理相关api
import order from "./order"; // z 导入订单相关api
import advert from "./advert"; // z 导入广告分类相关api

const api = {
  /** 登录接口
   * @param {Object} params
   * @param {string} params.user
   * @param {string} params.pwd
   */
  login(params) {
    return axios.post(base.login, params);
    // 注:post传参不需要进行解构,get传参需要解构
  },
  /** 用户权限数据接口
   * @param {Object} params
   * @param {string} params.token
   */
  permission(params) {
    return axios.get(base.permission, {params});
  },
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
  ...product, // s 使用对象扩展语法导入产品相关api
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
  ...order, // s 使用对象扩展语法导入订单相关api
  ...advert,
};

export default api;
