<template>
	<el-menu
		:default-active="
			$route.meta.activeName ? $route.meta.activeName : $route.name
		"
		class="el-menu-vertical-demo"
		background-color="#112f50"
		text-color="#fff"
		active-text-color="#ffd04b"
		router
		:collapse="isCollapse">
		<!-- s 菜单标题 -->
		<el-menu-item>
			<span slot="title">{{ $t("layout.menu.title") }}</span>
		</el-menu-item>
		<!-- s 首页 -->
		<el-menu-item :route="{ name: 'home' }" index="home">
			<i class="el-icon-s-home"></i>
			<!-- <span slot="title">首页</span> -->
			<span slot="title">{{ $t("layout.menu.home") }}</span>
		</el-menu-item>
		<!-- 动态菜单导航组件 -->
		<MenuList
			v-for="(item, index) in menuList"
			:key="index"
			:parent-path="item.path"
			:info="item" />
	</el-menu>
</template>

<script>
	import MenuList from "./MenuList";
	import { mapState } from "vuex";

	export default {
		components: { MenuList },
		methods: {},
		created() {
			console.log("菜单导航路由结果 this.menuList (created)", this.menuList);
		},
		computed: {
			...mapState({
				isCollapse: "menuIsCollapse",
			}),
			...mapState("menu", {
				menuList: "menuList",
			}),
		},
		watch: {},
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.el-menu {
		border-right: 0;

		/deep/.is-active {
			background: #1e78fb !important;
			color: white !important;
		}

		.el-menu-item,
		.el-submenu {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
</style>
