import axios from "@/utils/request";

const base = {
  //w 产品管理相关接口地址
  productList: "/api/goods/projectList", //w 商品列表：获取分页(参数：page 页码)
  searchInfo: "/api/goods/search", //w 商品查询接口 参数：search
  removeProductById: "/api/goods/deleteItemById", //w 商品信息删除接口 参数：id
};

export default {
  //w 产品列表(page)
  productList(params) {
    return axios.get(base.productList, {params});
  },
  //f 商品查询接口 参数：search
  // params={search:'xxx'}
  searchInfo(params) {
    return axios.get(base.searchInfo, {params});
  },
  removeProductById(params) {
    return axios.get(base.removeProductById, {params});
  },
};
