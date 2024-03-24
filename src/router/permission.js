import router from "@/router"; // s router
import { resetRouter } from "@/router";
import store from "@/store"; // s 导入仓库

/** 配置路由的全局前置守卫
 * @summary 配置说明：https://router.vuejs.org/zh/guide/advanced/navigation-guards
 */
router.beforeEach((to, from, next) => {
	// console.log("路由守卫————", to, from);
	// console.log("路由匹配信息", to);
	// z 如果是login页面则直接放行
	if (to.path === "/login") {
		next();
		return;
	}
	// z 如果不是登录页面都需要判断是否登录
	let { token } = store.state.account.userinfo;
	if (token) {
		// s 已登录
		// 判断是否取菜单导航路由
		let menuList = store.state.menu.menuList;
		if (!menuList.length) {
			// s 需要获取菜单导航路由
			// * 调用vuex menu仓库中的方法获取用户菜单导航
			// 这里只能使用then方法来获取到返回的结果
			store.dispatch("menu/getMenuInfo").then((bases) => {
				// 重置路由
				resetRouter(); //添加路由之前 清空路由实例内容
				// 向路由对象中添加路由
				bases.forEach((r) => {
					router.addRoute(r);
				});
			});
			next();
		} else {
			// s 无需获取菜单导航路由
			next();
		}
	} else {
		// s 未登录(将用户重定向到登录页面)
		next("/login");
	}
});
