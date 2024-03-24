<template>
	<!-- s 有子菜单 -->
	<el-submenu
		:index="info.path"
		v-show="!info.meta.activeName"
		v-if="info.children && info.children.length">
		<template slot="title">
			<i class="el-icon-location"></i>
			<span>{{ info.meta.title }} </span>
		</template>
		<el-menu-item-group>
			<!-- s 子菜单项 -->
			<MenuList
				v-for="(item, indexSon) in info.children"
				:key="indexSon"
				:info="item"
				:parent-path="info.path" />
		</el-menu-item-group>
	</el-submenu>
	<!-- s 无子菜单 -->
	<el-menu-item
		v-show="!info.meta.activeName"
		:route="{ name: info.name }"
		:index="info.name"
		v-else>
		<i class="el-icon-menu"></i>
		<span slot="title">{{ info.meta.title }}</span>
	</el-menu-item>
</template>

<script>
	/** 数据结构定义
	 * @typedef {object} Menu
	 * @property {string} name 路由名称
	 * @property {string} path 路由路径
	 * @property {{title?:string,activeName?:string}} meta 元数据
	 * @property {string} [redirect] 重定向路径
	 * @property {Menu[]} children 子路由
	 */

	export default {
		name: "MenuList" /** *递归组件必须添加name才能识别自身 */,
		props: {
			info: {
				type: Object,
				/** @type {Menu} */
				default: {
					path: null,
					meta: {},
					children: [],
				},
			},
			parentPath: {
				type: String,
				default: "",
			},
		},
		created() {
			// console.log("this.parentPath", this.parentPath);
		},
		data() {
			return {
				/** @type {Menu[]} */
				// menuList,
			};
		},
	};
</script>

<style lang="less" scoped></style>
