import axios from "@/utils/request";

const base = {
  //w 产品管理相关接口地址
  productList: "/api/goods/projectList", // 商品列表：获取分页(参数：page 页码)
};

export default {
  //w 产品列表(page)
  productList(params) {
    return axios.get(base.productList, {params});
  },
};
