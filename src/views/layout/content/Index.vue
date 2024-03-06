<template>
  <div>
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
    <router-view></router-view>
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
</style>
