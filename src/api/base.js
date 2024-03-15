// 接口地址
// w 环境变量获取api
const apiUrl = process.env.VUE_APP_BASE_URL;
const base = {
  uploadDeleteFile: apiUrl + "/upload/deleteFile", // w upload文件删除接口
  totalInfo: apiUrl + "/home/dataCount", // w 首页统计数据api
  orderInfo: apiUrl + "/home/orderinfo", // w 首页订单统计信息api
  chartInfo: apiUrl + "/home/format", // w 首页折线图数据统计 月销量、月销售额api
  itemCategory: apiUrl + "/itemCategory", // w 类目信息
};

// 单一导出
export const host = 'http://localhost:7788';
export const uploadUrl =
  (process.env.VUE_APP_ENV === "product" ? process.env.VUE_APP_BASE_API : apiUrl) + "/upload";
// 直接对象导出
export default base;
