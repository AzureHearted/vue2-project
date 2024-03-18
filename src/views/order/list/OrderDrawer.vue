<template>
  <el-drawer
    :title="title"
    :visible.sync="show"
    :direction="direction"
    :before-close="handleClose"
    :modal="false"
    :size="size"
    destroy-on-close>
    <slot>内容区</slot>
  </el-drawer>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "标题",
      },
      size: {
        type: [String, Number],
        default: "calc(100% - 300px)",
      },
      /**
       * @type {"rtl"|"ltr"|"ttb"|"btt"} 方向
       */
      direction: {
        type: String,
        default: "rtl",
      },
    },
    data() {
      return {
        show: this.visible,
      };
    },
    methods: {
      /** 点击抽屉关闭按钮时的回调
       * @param {Function} done 关闭抽屉的函数
       */
      handleClose(done) {
        this.show = false;
        this.$emit("visibleReturn", false);
        done();

        // this.$confirm("确认关闭？")
        //   .then((_) => {

        //     done();
        //   })
        //   .catch((_) => {});
      },
    },
    watch: {
      visible(val, oldVal) {
        // console.log(val, oldVal);
        this.show = val;
      },
    },
  };
</script>

<style lang="less" scoped></style>
