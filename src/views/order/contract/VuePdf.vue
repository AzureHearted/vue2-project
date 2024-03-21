<template>
  <div>
    <el-button type="primary" size="default" @click="print"> 打印 </el-button>
    <hr />
    <!-- 写法1:默认获取第一张pdf内容 -->
    <!-- <pdf ref="pdf" :src="url"></pdf> -->

    <!-- 写法2:获取总页数指定页码 -->
    <Pagination
      :current-page="currentPage"
      :page-size="1"
      :total="total"
      @CurrentChange="currentPage = $event"></Pagination>
    <pdf
      ref="pdf"
      :page="currentPage"
      :src="url"
      @page-loaded="currentPage = $event"
      @num-pages="total = $event"></pdf>
    <!-- 写法3:展示所有pdf -->
    <!-- <pdf
      v-for="index in total"
      :key="index"
      :page="index"
      :src="loadingTask"
      style="display: inline-block; widows: 20%"></pdf> -->
  </div>
</template>

<script>
  import pdf from "vue-pdf";
  import Pagination from "@/components/pagination/Pagination.vue";
  export default {
    props: {
      pdfUrl: {
        type: String,
        required: true,
      },
    },
    components: {
      pdf,
      Pagination,
    },
    methods: {
      /** 打印pdf */
      print() {
        this.$refs.pdf.print();
      },
    },
    created() {
      this.loadingTask = pdf.createLoadingTask(this.url);
    },
    mounted() {
      this.loadingTask.promise.then((pdf) => {
        this.total = pdf.numPages;
      });
    },
    data() {
      return {
        url: encodeURI(this.pdfUrl),
        total: undefined,
        currentPage: 1,
        loadingTask: undefined,
      };
    },
  };
</script>

<style lang="less" scoped></style>
