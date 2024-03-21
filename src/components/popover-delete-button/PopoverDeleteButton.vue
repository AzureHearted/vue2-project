<template>
  <el-popover placement="top-start" width="200" v-model="visible">
    <p>{{ tips }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">
        取消
      </el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">
        确认
      </el-button>
    </div>
    <el-button slot="reference" type="danger" size="mini"> 删除 </el-button>
  </el-popover>
</template>

<script>
  export default {
    props: {
      tips: String,
      default() {
        return "删除后无法恢复,确定删除吗？";
      },
    },
    methods: {
      handleConfirm() {
        this.visible = false;
        this.$emit("confirm-click");
      },
    },
    created() {
      // console.log(this.$attrs);
    },
    data() {
      return {
        visible: false,
      };
    },
  };
</script>

<style lang="less" scoped></style>
