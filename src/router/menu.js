/** 动态菜单导航路由 全部的菜单导航 除了首页 */

// w 异步加载组件
// s 商品管理
const Product = () => import("@/views/product/Index.vue");
const ProductList = () => import("@/views/product/list/Index.vue");
const ProductCategory = () => import("@/views/product/category/Index.vue");
const ProductPage = () => import("@/views/product/list/ProductPage.vue");
// s 订单管理
const Order = () => import("@/views/order/Index.vue");
const OrderList = () => import("@/views/order/list/Index.vue");
const OrderCollection = () => import("@/views/order/collection/Index.vue");
const OrderContract = () => import("@/views/order/contract/Index.vue");
// s 广告分类
const Advert = () => import("@/views/advert/Index.vue");
const AdverList = () => import("@/views/advert/list/Index.vue");
// s 系统管理
const SysManage = () => import("@/views/sysManage/Index.vue");
const RoleManage = () => import("@/views/sysManage/roleManage/Index.vue");
const DepartmentManage = () =>
	import("@/views/sysManage/departmentManage/Index.vue");

export const menu = [
	// w 产品管理 路由配置
	{
		path: "/product",
		name: "product",
		component: Product,
		redirect: "/product/list", // w 重定向 访问 /product 时重定向到 /product/list
		meta: {
			title: "产品管理",
		},
		children: [
			{
				path: "list", //访问路径：/product/list
				name: "product-list",
				component: ProductList,
				meta: {
					title: "产品列表",
				},
			},
			{
				path: "category", //访问路径：/product/category
				name: "product-category",
				component: ProductCategory,
				meta: {
					title: "产品分类",
				},
			},
			{
				path: "product-page",
				name: "productPage",
				component: ProductPage,
				meta: {
					// w 配置一个左侧菜单导航高亮的标识
					activeName: "product-list",
					title: "商品详情",
				},
			},
		],
	},
	// w 订单管理 路由配置
	{
		path: "/order",
		name: "order",
		component: Order,
		redirect: "/order/list",
		meta: {
			title: "订单管理",
		},
		children: [
			{
				path: "list", //访问路径：/order/list
				name: "order-list",
				component: OrderList,
				meta: {
					title: "订单列表",
				},
			},
			{
				path: "collection", //访问路径：/order/collection
				name: "order-collection",
				component: OrderCollection,
				meta: {
					title: "汇总清单",
				},
			},
			{
				path: "contract", //访问路径：/order/contract
				name: "order-contract",
				component: OrderContract,
				meta: {
					title: "订单审核",
				},
			},
		],
	},
	// w 广告分类 路由配置
	{
		path: "/advert",
		name: "advert",
		component: Advert,
		redirect: "/advert/list",
		meta: {
			title: "广告分类",
		},
		children: [
			{
				path: "list", //访问路径：/advert/list
				name: "advert-list",
				component: AdverList,
				meta: {
					title: "广告列表",
				},
			},
		],
	},
	// w 系统管理
	{
		path: "/system",
		name: "system",
		component: SysManage,
		redirect: "/system/role",
		meta: {
			title: "系统管理",
		},
		children: [
			{
				path: "role",
				name: "system-role",
				component: RoleManage,
				meta: {
					title: "角色管理",
				},
			},
			{
				path: "department",
				name: "system-department",
				component: DepartmentManage,
				meta: {
					title: "部门管理",
				},
			},
		],
	},
];
