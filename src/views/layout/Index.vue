<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!-- 右侧内容 -->
    <div
      class="content"
      :class="{small: isCollapse}"
    >
      <Content
        @changShow="changeShow"
        :isCollapse="isCollapse"
      ></Content>
    </div>
  </div>
</template>

<script>
  import Menu from "./menu/Index.vue";
  import Content from "./content/Index.vue";
  export default {
    components: {
      Menu,
      Content,
    },
    data() {
      return {
        isCollapse: false, // 导航栏展开与收缩状态
      };
    },
    methods: {
      //s 用于控制导航栏的展开与收缩
      changeShow() {
        this.isCollapse = !this.isCollapse;
      },
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
      padding-left: 200px;
      transition: 0.3s ease-in-out;
    }
    .small {
      padding-left: 64px;
    }
  }
</style>
