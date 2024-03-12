<template>
  <el-upload
    :action="uploadUrl"
    list-type="picture-card"
    :on-success="uploadSucess"
    :on-remove="removeImg"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import {uploadUrl, host} from "@/api/base"; //w 导入图片上传接口

  export default {
    data() {
      return {
        uploadUrl,
        image: [],
      };
    },
    methods: {
      //f 上传成功后的回调
      uploadSucess(response, file, fileList) {
        console.log("图片上传成功!", response, file, fileList);
        let imgUrl = new URL(host + "/" + response.url.slice(7)).href;
        // console.log("图片路径", imgUrl);
        //w 图片上传成功后返回路径最新的图片路径列表给父组件
        this.image.push(imgUrl);
        this.$emit("uploadSucess", imgUrl, this.image);
        // this.form.image.push(imgUrl);
      },
      //f 图片移除时的回调
      removeImg(file, fileList) {
        console.log("图片删除", file, fileList);
        //z 后续在server路径下完善后端对图片删除的操作
      },
    },
  };
</script>

<style></style>
