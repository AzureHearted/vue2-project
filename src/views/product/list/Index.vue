<template>
  <div>
    <!-- 产品搜索 -->
    <!-- 
      el-form 表单
        :inline="true" 设置inline可以让表单域变为行内的表单域
        :model="formInline" 表单数据对象 object

      el-form-item 表单项
        label 表示表单项的名称

      el-input 表单输入框

      el-date-picker 日期选择组件
    -->

    <div class="header">
      <div class="form">
        <el-form
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          label-position="right"
          size="small"
        >
          <el-form-item label="产品名称">
            <el-input
              v-model="formData.productName"
              placeholder="产品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              type="date"
              v-model="formData.addTime"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="content">产品列表</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //s 查询表单数据 
        formData: {
          productName: "",
          addTime: "",
        },
      };
    },
    methods: {
      onSubmit() {
        // console.log("表单内容", this.formData.productName, this.formData.addTime);
      },
    },
  };
</script>

<style lang="less" scoped>
  .header {
    background: #fff;
    margin-bottom: 20px;
    padding: 10px;
  }
  .content {
    background: pink;
  }
</style>
