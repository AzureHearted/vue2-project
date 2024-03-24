<template>
	<div class="container">
		<!-- w 顶部区域 -->
		<div class="header">
			<!-- w 侧边菜单 控制按钮-->
			<div class="open">
				<span
					class="iconfont icon-right-indent"
					@click="changMenu(true)"
					v-if="!isCollapse">
				</span>
				<span
					class="iconfont icon-left-indent"
					@click="changMenu(false)"
					v-else></span>
			</div>
			<!-- w 顶部右上角功能区-->
			<div class="right">
				<!-- w 时间-->
				<span>{{ time }}</span>
				|
				<!-- w 下拉菜单 -->
				<el-dropdown style="color: white" @command="changeLang">
					<span class="el-dropdown-link">
						{{ $t("layout.header.language_environment") }}
						<!-- {{ 语言环境 }} -->
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="zh-CN"> 中文 </el-dropdown-item>
						<el-dropdown-item command="en-US"> English </el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				|
				<!-- w 欢迎语 -->
				<span>欢迎 {{ userinfo.username }}</span>
				|
				<!-- w 退出按钮 -->
				<span class="el-icon-switch-button icon" @click="loginOut"></span>
			</div>
		</div>
		<!-- w面包屑 -->
		<Breadcrumb
			v-if="this.$route.name != 'home'"
			style="position: sticky; top: 50px; z-index: 2" />
		<!-- w 内容区域 -->
		<div class="wrapper">
			<!-- 路由出口 -->
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import dayjs from "dayjs";

	let timer = null;

	export default {
		computed: {
			...mapState({
				isCollapse: "menuIsCollapse",
			}),
			...mapState("account", { userinfo: "userinfo" }),
		},
		created() {
			// console.table("i18n", this.$i18n);
			// w 每秒进行一次时间更新(首次立即执行)
			this.reNewTime();
			timer = setInterval(() => {
				this.reNewTime();
			}, 1000);
		},
		destroyed() {
			clearInterval(timer);
		},
		methods: {
			/** 更新时间 */
			reNewTime() {
				this.time = dayjs().format("YYYY年MM月DD日 HH:mm:ss");
			},
			/** 用于更改导航栏的展开与收缩状态 */
			changMenu() {
				this.$store.commit("changeMenuCollapse", !this.isCollapse);
			},
			/** 退出系统 */
			loginOut() {
				// 清空vuex中临时信息
				this.$store.dispatch("clearInfo");
				// this.$store.commit("account/clearInfo");
				// this.$store.commit("product/clearInfo");
				// 清空vuex保持化插件在localStorage中存储的临时信息(可能会报错)
				// localStorage.removeItem("vuex-state");
				// 路由跳转到登录界面
				this.$router.push("/login");
			},
			/** (切换语言)下拉菜单点击事件 */
			changeLang(command) {
				this.$i18n.locale = command;
			},
		},
		data() {
			return {
				time: "",
			};
		},
	};
</script>

<style lang="less" scoped>
	.container {
		display: flex;
		flex-flow: column nowrap;
		.header {
			display: flex;
			height: 50px;
			background: #1e78bf;
			color: #fff;
			line-height: 50px;
			top: 0;
			position: sticky;
			z-index: 2;

			.open {
				flex: 1;
				.iconfont {
					font-size: 22px;
					cursor: pointer;
				}
			}
			.right {
				display: flex;
				gap: 8px;
				align-items: center;
				padding: 0 8px;
				.icon {
					font-size: 16px;
				}
			}
		}
		//内容区容器
		.wrapper {
			flex: 1;
			// padding: 4px;
      padding: 10px;
			// overflow-y: auto;
		}
	}
</style>
