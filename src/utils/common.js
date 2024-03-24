// w 公共方法

// import _ from "lodash";
import { cloneDeep } from "lodash";

/** 处理数据html标签显示界面
 * @param {string} htmlStr
 */
export function removeHTMLTag(htmlStr) {
	let html = htmlStr
		.replace(/<img.*?>/g, "图片")
		.replaceAll(/<[^>]+>/g, "")
		.replace(/&nbsp;/gi, "");
	return html;
}

/** 获取路径对应的名称
 * @param {string} path
 * @returns
 */
export function getPathName(path = "") {
	let matches = path.match(/([^/]+)$/);
	if (matches) {
		return matches[0]; // 获取数组中的第一个元素，即首个匹配项
	} else {
		return path;
	}
}

/** 定义菜单匹配规则
 * @param {*[]} menuRoute 路由信息
 * @param {*[]} menuList 菜单信息列表
 * @returns {*[]} 匹配出来的路由信息结果
 */
export function rulesMenu(menuRoute, menuList) {
	let routes = [];
	// 获取当前层级
	routes = menuList
		.map((item) => {
			let index = menuRoute.findIndex(
				(r) => r.meta.title === item.name
			);
			if (index >= 0) {
				// let matched = JSON.parse(JSON.stringify(menuRoute[index])); // 深拷贝,此处不能使用JSON来深拷贝,会丢失组件方法
				// 只能使用lodash这个js库来进行深拷贝才能保证组件方法不丢失
				let matched = cloneDeep(menuRoute[index]);
				// 如果children不为空则再递归的匹配内层
				if (item?.children?.length > 0) {
					if (!matched?.children?.length) menuRoute.children = [];
					// 递归遍历内层
					matched.children = rulesMenu(matched.children, item.children);
				} else {
					matched.children = [];
				}
				return matched;
			} else {
				return null;
			}
		})
		.filter((x) => x);
	return routes;
}
