<template>
	<el-menu
		:default-active="
			$route.meta.activeMenu ? $route.meta.activeMenu : $route.path
		"
		class="el-menu-vertical-demo"
		background-color="#112f50"
		text-color="#fff"
		active-text-color="#ffd04b"
		router
		:collapse="isCollapse">
		<el-menu-item>
			<span slot="title">{{ $t("layout.menu.title") }}</span>
		</el-menu-item>
		<!-- s 首页 -->
		<el-menu-item index="/">
			<i class="el-icon-menu"></i>
			<!-- <span slot="title">首页</span> -->
			<span slot="title">{{ $t("layout.menu.home") }}</span>
		</el-menu-item>
		<!-- s 产品管理 -->
		<el-submenu index="/product">
			<template slot="title">
				<i class="el-icon-s-goods"></i>
				<span>{{ $t("layout.menu.product_management") }}</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/product/list">
					<i class="el-icon-setting"></i>
					<span>产品列表</span>
				</el-menu-item>
				<el-menu-item index="/product/category">
					<i class="el-icon-setting"></i>
					<span>产品分类</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<!-- s 订单管理 -->
		<el-submenu index="/order">
			<template slot="title">
				<i class="el-icon-s-goods"></i>
				<!-- <span>订单管理</span> -->
				<span>{{ $t("layout.menu.order_management") }}</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/order/list">
					<i class="el-icon-setting"></i>
					<span>订单列表</span>
				</el-menu-item>
				<el-menu-item index="/order/collection">
					<i class="el-icon-setting"></i>
					<span>汇总清单</span>
				</el-menu-item>
				<el-menu-item index="/order/contract">
					<i class="el-icon-setting"></i>
					<span>订单审核</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<!-- s 广告分类 -->
		<el-submenu index="/advert">
			<template slot="title">
				<i class="el-icon-s-goods"></i>
				<!-- <span>广告分类</span> -->
				<span>{{ $t("layout.menu.advertising_classification") }}</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/advert/list">
					<i class="el-icon-setting"></i>
					<span>广告列表</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<!-- s 系统管理 -->
		<el-submenu index="/system">
			<template slot="title">
				<i class="el-icon-setting"></i>
				<!-- <span>系统管理</span> -->
				<span>{{ $t("layout.menu.system_management") }}</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/system/role">
					<i class="el-icon-setting"></i>
					<span>角色管理</span>
				</el-menu-item>
				<el-menu-item index="/system/department">
					<i class="el-icon-setting"></i>
					<span>部门管理</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		created() {
			console.log("菜单导航路由结果 this.menuList (created)", this.menuList);
		},

		methods: {},
		computed: {
			...mapState({
				isCollapse: "menuIsCollapse",
			}),
			...mapState("menu", ["menuList"]),
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

		.is-active {
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
