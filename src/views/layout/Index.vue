<template>
	<div class="layout">
		<!-- w左侧导航 -->
		<div class="menu">
			<Menu></Menu>
		</div>
		<!-- w右侧内容 -->
		<div class="content" :class="{ small: isCollapse }">
			<Content></Content>
		</div>
	</div>
</template>

<script>
	import Menu from "./menu/Index.vue";
	import Content from "./content/Index.vue";
	import { mapState } from "vuex";

	export default {
		components: {
			Menu,
			Content,
		},
		data() {
			return {};
		},
		computed: {
			...mapState({
				isCollapse: "menuIsCollapse",
			}),
		},
	};
</script>

<style lang="less" scoped>
	.layout {
		.menu {
			background: #112f50;
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
		}
		.content {
			height: 100%;
			padding-left: 200px;
			transition: 0.3s ease-in-out;
		}
		.small {
			padding-left: 64px;
		}
	}
</style>
