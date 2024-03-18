import axios from "@/utils/request";

// w 环境变量获取api
const apiUrl = process.env.VUE_APP_BASE_URL;
const base = {
  // w 产品管理相关接口地址
  productList: apiUrl + "/goods/projectList", // w 商品列表：获取分页(参数：page 页码)
  searchInfo: apiUrl + "/goods/search", // w 商品查询接口 参数：search
  productInfoById: apiUrl + "/goods/productInfoById", //w 通过id查询商品信息接口 参数: id
  removeProductById: apiUrl + "/goods/deleteItemById", // w 商品信息删除接口 参数：id
  batchRemoveProductById: apiUrl + "/goods/batchDelete", // w 商品信息批量删除接口 参数: Array(String)
  // w 类目选择接口 说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：type
  selectItemCategoryByParentId: apiUrl + "/goods/itemCategory/selectItemCategoryByParentId",
  addProduct: apiUrl + "/goods/item/insertTbItem", // w 商品添加接口
  updateProduct: apiUrl + "/goods/item/updateTbItem", //w 商品信息更新接口
};

export default {
  /** 产品列表获取
   * @param {Object} params
   * @param {number} params.page
   * @returns
   */
  productList(params) {
    return axios.get(base.productList, {params});
  },
  /** 商品查询接口
   * @param {Object} params
   * @param {string} params.search
   * @returns
   */
  searchInfo(params) {
    return axios.get(base.searchInfo, {params});
  },
  /** 通过id查询商品信息接口
   * @param {Object} params
   * @param {number} params.id
   * @returns
   */
  productInfoById(params) {
    return axios.get(base.productInfoById, {params});
  },
  /** 商品删除接口(单个)
   * @param {Object} params
   * @param {number} params.id
   * @returns
   */
  removeProductById(params) {
    return axios.get(base.removeProductById, {params});
  },
  /** 商品批量删除接口(多个)
   * @param {Object} params
   * @param {number[]} params.ids
   * @returns
   */
  batchRemoveProductById(params) {
    return axios.get(base.batchRemoveProductById, {params});
  },
  /** 商品类目查询
   * @param {Object} params
   * @param {number} params.cid
   * @param {?number} params.type
   * @returns
   */
  selectItemCategoryByParentId(params) {
    return axios.get(base.selectItemCategoryByParentId, {params});
  },
  /** 商品添加接口
   * @param {Object} params 商品信息对象
   * @param {string} params.category 商品类别
   * @param {string} params.cid 商品类别id
   * @param {number} params.title 商品名称
   * @param {number} params.price 商品单价
   * @param {string} params.num 商品数量
   * @param {string} params.sellPoint 商品卖点
   * @param {string} params.image 商品图片
   * @param {string} params.descs 商品描述
   * @param {?*} params.paramsInfo 其他参数
   * @returns
   */
  addProduct(params) {
    return axios.get(base.addProduct, {params});
  },
  /** 修改商品接口
   * @param {Object} params 商品信息对象
   * @param {number} params.id 商品id
   * @param {string} params.category 商品类别
   * @param {string} params.cid 商品类别id
   * @param {number} params.title 商品名称
   * @param {number} params.price 商品单价
   * @param {string} params.num 商品数量
   * @param {string} params.sellPoint 商品卖点
   * @param {string} params.image 商品图片
   * @param {string} params.descs 商品描述
   * @param {?*} params.paramsInfo 其他参数
   * @returns
   */
  updateProduct(params) {
    return axios.get(base.updateProduct, {params});
  },
};
