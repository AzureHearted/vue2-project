<template>
  <div>
    <el-menu
      :default-active="$route.meta.activeMenu ? $route.meta.activeMenu : $route.path"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">我的生鲜采购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- s产品管理 -->
      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">
            <i class="el-icon-setting"></i>
            产品列表
          </el-menu-item>
          <el-menu-item index="/product/category">
            <i class="el-icon-setting"></i>
            产品分类
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- s订单管理 -->
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/list">
            <i class="el-icon-setting"></i>
            订单列表
          </el-menu-item>
          <el-menu-item index="/order/collection">
            <i class="el-icon-setting"></i>
            汇总清单
          </el-menu-item>
          <el-menu-item index="/order/audit">
            <i class="el-icon-setting"></i>
            订单审核
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- s广告分类 -->
      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>广告分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/list">
            <i class="el-icon-setting"></i>
            广告列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    props: ["isCollapse"],
    data() {
      return {
        // activeIndex: "", //w (废弃)
      };
    },
    watch: {
      //f 监听路由变化(废弃)
      // $route(to, from) {
      //   console.log("路由变化---", to);
      //   //w 判断当前路由里面是否含有meta对象
      //   let {meta, path} = to;
      //   //s 判断meta中是否包含activeMenu,包含则返回该值,不存在就返回path
      //   this.activeIndex = meta.activeMenu ? meta.activeMenu : path;
      // },
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
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
