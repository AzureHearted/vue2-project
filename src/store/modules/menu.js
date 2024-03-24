/** 用于记录用户权限下的菜单导航 */

// 导入api接口方法
import api from "@/api/index";
// 导入路由和基本路由信息
import router, { routes, baseRoutes } from "@/router";
// 导入前端定义好的完整的路由信息
import { menu } from "@/router/menu";

import { rulesMenu } from "@/utils/common";
import { cloneDeep } from "lodash";

export default {
	namespaced: true,
	state: {
		menuList: [],
	},
	// mutations只能用于同步操纵state中的数据,不能进行异步操作
	mutations: {
		/** 设置(修改)Menu数据 */
		setMenu(state, data) {
			state.menuList = data;
		},
		/** 清除数据 */
		clearInfo(state) {
			state.menuList = [];
		},
	},
	// actions可以进行异步操作操作,不能(建议)直接操作state中的数据,但是可以调用mutations中的方法来对state中的数据更改
	actions: {
		/** 异步获取用户菜单信息 */
		async getMenuInfo({ state, commit, rootState }) {
			// 获取account中的存储的用户token
			let { token } = rootState.account.userinfo;
			// 发起请求获取用户权限数据
			let res = await api.permission({ token });
			// console.log("动态请求菜单导航", res.data);
			if (res.data.status === 200) {
				// 在actions中不能直接操作state中的数据,通过commit来调用mutations中的方法来修改
				// commit("setMenu", res.data.data);
				// 处理前后端的菜单导航数组
				// console.log("前端定义的导航菜单————", menu);
				// console.log("用户菜单信息返回结果————", res.data.data);
				let reslutMenu = rulesMenu(menu, res.data.data);
				// console.log("处理后的Menu结果", reslutMenu);
				// 存储结果到state中
				commit("setMenu", reslutMenu);
				// 需要深拷贝处理,不能直接使用原始数据
				let bases = cloneDeep(baseRoutes);
				bases[0].children.push(...reslutMenu);

				return bases;
				// console.log("当前router对象", router);
			}
		},
	},
};
