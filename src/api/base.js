// 接口地址
const base = {
  uploadDeleteFile: "/api/upload/deleteFile", // w upload文件删除接口
  totalInfo: "/api/home/dataCount", // w 首页统计数据api
  orderInfo: "/api/home/orderinfo", // w 首页订单统计信息api
  chartInfo: "/api/home/format", // w 首页折线图数据统计 月销量、月销售额api
  itemCategory: "/api/itemCategory", // w 类目信息
};

// 单一导出
export const host = "http://localhost:7788";
export const uploadUrl = "/api/upload";
// 直接对象导出
export default base;
