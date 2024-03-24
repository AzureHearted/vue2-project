<template>
	<div class="container">
		<div class="box">
			<div class="title">
				<h2>登录</h2>
			</div>
			<div class="content">
				<div class="form" @keyup.enter.stop="onSubmit">
					<div class="login--account">
						<span class="label">账号:</span>
						<input
							type="text"
							placeholder="输入账户名或邮箱"
							v-model.trim="username"
							name="account" />
					</div>
					<div class="login--passward">
						<span class="label">密码:</span>
						<input
							type="password"
							placeholder="输入密码"
							v-model.trim="password"
							name="password" />
					</div>
					<el-button type="primary" @click="onSubmit">登录</el-button>
				</div>
				<div class="tips">
					<p>由于是测试,可直接登录</p>
					<p>账号和密码随意输入 —— 账号: admin是超级管理员</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			/** 登录提交  */
			async onSubmit() {
				let { username, password } = this;
				// 用户名或密码为空则进行提示,且不进行下一步操作
				if (username.length < 1 || password.length < 1) {
					this.$message({
						type: "warning",
						message: "请输入用户名或密码",
					});
					return;
				}
				// 用户名和密码都不为空则进行下一步操作
				let res = await this.$api.login({
					user: username,
					pwd: password,
				});
				// 判断是否登录成功
				if (res.data.status === 200) {
					// console.log("登录成功!", res.data);
					let { token } = res.data;
					// 登录成功则在vuex仓库中记录token
					this.$store.commit("account/setInfo", { username, token });
					// 跳转页面
					this.$router.push("/");
					// 成功提示
					this.$message({
						type: "success",
						message: "登录成功!",
					});
				} else {
					this.$message({
						type: "success",
						message: "登录失败! 请检查用户名和密码",
					});
				}
			},
		},
		data() {
			return {
				username: "",
				password: "",
			};
		},
	};
</script>

<style lang="less" scoped>
	.container {
		position: fixed;
		inset: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		background: rgba(64, 64, 194, 0.1);

		.box {
			background: #fff;
			width: 420px;
			// height: 300px;
			padding: 20px 40px;

			box-shadow: 0px 0px 20px gray;

			.title {
				// background: white;
				height: 50px;
				line-height: 50px;
				text-align: center;

				h2 {
					font-size: 22px;
				}
			}

			.content {
				.form {
					display: flex;
					flex-flow: column;

					.login--account,
					.login--passward,
					.button {
						margin: 10px 0 20px;
					}

					.login--account,
					.login--passward {
						position: relative;

						padding: 10px 0;

						display: flex;
						align-items: center;
						// gap: 40px;

						border-bottom: 1px solid #ddd;

						.label {
							width: 80px;
							font-size: 20px;
						}

						input {
							flex: 1;
							height: 30px;
							background: none;
							border: none;

							// &:focus-visible {
							//   border: none;
							//   outline: none;
							// }
						}
					}

					.el-button {
						font-size: 18px;
						height: 50px;
					}
				}

				.tips {
					text-align: center;
					color: #999999;
					margin: 20px 0 0;
				}
			}
		}
	}
</style>
