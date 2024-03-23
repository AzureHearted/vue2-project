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
      <span slot="title">
        {{ $t("layout.menu.title") }}
      </span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <!-- <span slot="title">首页</span> -->
      <span slot="title">
        {{ $t("layout.menu.home") }}
      </span>
    </el-menu-item>
    <!-- s产品管理 -->
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
    <!-- s订单管理 -->
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
    <!-- s广告分类 -->
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
    <!-- s系统管理 -->
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
  import {mapState} from "vuex";
  export default {
    data() {
      return {
        // activeIndex: "", // w (废弃)
      };
    },
    computed: {
      ...mapState({
        isCollapse: "menuIsCollapse",
      }),
    },
    watch: {
      // f 监听路由变化(废弃)
      // $route(to, from) {
      //   console.log("路由变化---", to);
      //   // w 判断当前路由里面是否含有meta对象
      //   let {meta, path} = to;
      //   // s 判断meta中是否包含activeMenu,包含则返回该值,不存在就返回path
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
