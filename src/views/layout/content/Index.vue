<template>
  <div class="container">
    <!-- 顶部区域 -->
    <div class="header">
      <div class="open">
        <span
          class="iconfont icon-right-indent"
          @click="changMenu"
          v-if="!isCollapse"
        ></span>
        <span
          class="iconfont icon-left-indent"
          @click="changMenu"
          v-else
        ></span>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="wrapper">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["isCollapse"],
    methods: {
      changMenu() {
        this.$emit("changShow");
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    .header {
      height: 50px;
      background: #1e78bf;
      color: #fff;
      line-height: 50px;
      .open {
        .iconfont {
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    //内容区容器
    .wrapper {
      flex: 1;
      margin: 10px;
      overflow-y:auto;
    }
  }
</style>
