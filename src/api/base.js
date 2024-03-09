// 接口地址
const base = {
  totalInfo: "/api/home/dataCount", //w 首页统计数据api
  orderInfo: "/api/home/orderinfo", //w 首页订单统计信息api
  chartInfo: "/api/home/format", //w 首页折线图数据统计 月销量、月销售额api
  searchInfo:"/api/goods/search" //w 商品查询接口 参数：search
};

// 单一导出
// export const host = "xxx";
// 直接对象导出
export default base;
