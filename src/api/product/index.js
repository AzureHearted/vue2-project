import axios from "@/utils/request";

const base = {
  // w 产品管理相关接口地址
  productList: "/api/goods/projectList", // w 商品列表：获取分页(参数：page 页码)
  searchInfo: "/api/goods/search", // w 商品查询接口 参数：search
  productInfoById: "/api/goods/productInfoById", //w 通过id查询商品信息接口 参数: id
  removeProductById: "/api/goods/deleteItemById", // w 商品信息删除接口 参数：id
  batchRemoveProductById: "/api/goods/batchDelete", // w 商品信息批量删除接口 参数: Array(String)
  // w 类目选择接口 说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：type
  selectItemCategoryByParentId: "/api/goods/itemCategory/selectItemCategoryByParentId",
  addProduct: "/api/goods/item/insertTbItem", // w 商品添加接口
  updateProduct: "/api/goods/item/updateTbItem", //w 商品信息更新接口
};

export default {
  // f 产品列表 参数：page
  productList(params) {
    return axios.get(base.productList, {params});
  },
  // f 商品查询接口 参数：search
  // params={search:'xxx'}
  searchInfo(params) {
    return axios.get(base.searchInfo, {params});
  },
  // f 通过id查询商品信息接口 参数: id
  productInfoById(params) {
    return axios.get(base.productInfoById, {params});
  },
  // f 商品删除接口(单个) 参数：id
  removeProductById(params) {
    return axios.get(base.removeProductById, {params});
  },
  // f 商品批量删除接口(多个) 参数：ids (Array)
  batchRemoveProductById(params) {
    return axios.get(base.batchRemoveProductById, {params});
  },
  // f 商品类目查询 接口不同的参数cid 返回不同的类目数据 后台接受变量：type (可留空，默认返回1级类目)
  selectItemCategoryByParentId(params) {
    return axios.get(base.selectItemCategoryByParentId, {params});
  },
  // w 商品添加接口
  // 参数：title, image, sellPoint, price, cid, category, num, descs, paramsInfo
  addProduct(params) {
    return axios.get(base.addProduct, {params});
  },
  // w 修改商品接口
  // 参数: id, title, cid, category, sellPoint, price, num, descs, image, paramsInfo
  updateProduct(params) {
    return axios.get(base.updateProduct, {params});
  },
};
