<template>
  <div class="breadcrumb" style="padding-bottom: 10px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(nav, index) in navs"
        :key="index"
        :to="nav.to">
        {{ nav.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  /** 路由对象数据格式(尽列出部分属性)
   * @typedef {object} route
   * @property {string} path
   * @property {string=} redirect
   * @property {string} name
   * @property {route} parent
   * @property {{breadcrumbTitle?:string}} meta
   */

  export default {
    computed: {
      navs() {
        /** @type {route[]} */
        let matched = this.$route.matched;
        // console.log("当前路由", matched);
        return matched.map((r) => {
          let {path, redirect, name, parent, meta} = r;
          return {
            title: meta.breadcrumbTitle,
            to: this.toPath(path, redirect),
          };
        });
      },
    },
    methods: {
      toPath(path, redirect) {
        let to = "";
        if (redirect) {
          to = redirect ? redirect : "/";
        } else {
          to = path ? path : "/";
        }
        // return to === this.$route.path ? "" : to;
        return to;
      },
    },
    data() {
      return {};
    },
  };
</script>

<style lang="less" scoped>
  .breadcrumb {
    padding: 10px;
    background: #f5f5f5;
    // z-index: 2;
  }
</style>
