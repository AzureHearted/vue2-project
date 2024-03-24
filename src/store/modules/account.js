/** 账户信息仓库 */
export default {
	namespaced: true, //启用命名空间
	state: {
		userinfo: {
			username: "",
			token: "",
		},
	},
	mutations: {
		/** 设置账户信息 */
		setInfo(state, payload) {
			let { username, token } = payload;
			state.userinfo.username = username;
			state.userinfo.token = token;
		},
		/** 清除信息 */
		clearInfo(state) {
			state.userinfo = {};
		},
	},
	actions: {
		/** 获取用户权限数据 */
		getPermissionInfo() {},
	},
};
