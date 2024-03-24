import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";


Vue.use(VueRouter);

// 基础路由
export const baseRoutes = [
	{
		path: "/",
		component: Layout,
		meta: {
			title: "首页",
			// requireLogin: true, // 用于判断是否需要登录
		},
		children: [
			{
				path: "/",
				name: "home",
				component: Home,
				meta: {
					title: "首页",
				},
			},
			// 后续通过动态添加的方式来将menu中的路由添加进去
		],
	},
];

export const routes = [
	// w 登录页 路由配置
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	// ...baseRoutes,
];

const createRouter = () =>
	new VueRouter({
		// mode: "history",
		// mode: "hash",
		mode: process.env.VUE_APP_ENV === "product" ? "hash" : "history",
		base: process.env.BASE_URL,
		routes,
	});

const router = createRouter();
// 重置路由
export function resetRouter() {
	const newRouter = createRouter();
	// 这一行是关键。新创建的 newRouter 实例的 matcher 属性赋值给全局 router 实例的 matcher 属性。在 Vue Router 中，matcher 是一个内部对象，它负责将 URL 路径映射到对应的路由记录。通过替换 router 的 matcher，实际上是替换了路由匹配逻辑，这相当于重置了路由配置。
	router.matcher = newRouter.matcher;
}

export default router;
