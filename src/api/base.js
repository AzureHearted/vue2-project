// 接口地址
// w 环境变量获取api
const apiUrl = process.env.VUE_APP_BASE_URL;
const base = {
  /** 登录接口 */
  login: apiUrl + "/login",
  /** 用户权限数据接口 */
  permission: apiUrl + "/permission",
  /** upload文件删除接口api */
  uploadDeleteFile: apiUrl + "/upload/deleteFile",
  /** 首页统计数据api */
  totalInfo: apiUrl + "/home/dataCount",
  /** 首页订单统计信息api */
  orderInfo: apiUrl + "/home/orderinfo",
  /** 首页折线图数据统计：月销量、月销售额api */
  chartInfo: apiUrl + "/home/format",
  /** 类目信息api */
  itemCategory: apiUrl + "/itemCategory",
  /** 增加一级导航类目api */
  insertCategory: apiUrl + "/itemCategory/insertCategory",
  /** 修改导航类目api */
  updateCategory: apiUrl + "/itemCategory/updateCategory",
  /** 删除导航类目api */
  deleteContentCategoryById: apiUrl + "/content/deleteContentCategoryById",
  /** 新增子类目api */
  insertItemCategory: apiUrl + "/itemCategory/insertItemCategory",
};

// 单一导出
export const host = "http://localhost:7788";
export const uploadUrl =
  (process.env.VUE_APP_ENV === "product"
    ? process.env.VUE_APP_BASE_API
    : apiUrl) + "/upload";
// 直接对象导出
export default base;
