<template>
  <div class="container">
    <!-- w 内容容器 -->
    <div class="wrapper">
      <span>订单合同:</span>
      <el-button size="medium" @click="dialogVisible = true">
        查看合同
      </el-button>
      <!-- pdf打印 通过vue实现pdf打印 -->
      <el-dialog
        title="查看合同"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleClose">
        <VuePdf :pdf-url="pdfUrl"></VuePdf>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import VuePdf from "./VuePdf.vue";

  export default {
    components: {VuePdf},
    methods: {
      handleClose() {
        console.log("关闭");
      },
    },
    data() {
      return {
        dialogVisible: false,
        pdfUrl:
          process.env.VUE_APP_ENV === "product" ? "合同.pdf" : "/合同.pdf",
      };
    },
  };
</script>

<style lang="less" scoped>
  .container {
    height: fit-content;
    .wrapper {
      padding: 20px;
      background: white;
      display: flex;
      flex-flow: row;
      gap: 10px;
      align-items: center;
    }
  }
</style>
