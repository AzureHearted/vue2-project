<template>
  <div class="container">
    <!-- 
    el-upload 上传图片
        action	必选参数，上传的地址	string
        list-type	文件列表的类型	string	text/picture/picture-card	text
        on-preview	点击文件列表中已上传的文件时的钩子	function(file)	—	—
        on-remove	文件列表移除文件时的钩子	function(file, fileList)	—	—
        on-success	文件上传成功时的钩子	function(response, file, fileList)
        multiple	是否支持多选文件	boolean
        file-list	上传的文件列表, 
          例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array	—	[]
        disabled	是否禁用	boolean	—	false
        limit	最大允许上传个数	number	—	—
        on-exceed	文件超出个数限制时的钩子	function(files, fileList)

        方法：
            clearFiles
    -->
    <el-upload
      ref="upload"
      :action="uploadUrl"
      :file-list="inputFileList"
      list-type="picture-card"
      :on-success="handleSucess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :auto-upload="autoUpload"
      multiple
      :disabled="disabled"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- w上传按钮 -->
    <div
      class="buttonGroup"
      v-if="unUploadAmount > 0 && !autoUpload"
    >
      <el-button
        type="primary"
        size="small"
        @click="handleSubmit"
      >
        全部上传
      </el-button>
    </div>
    <!-- w图片预览框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      center
    >
      <template slot="title">
        <span> {{ dialogImageFile.name }} </span>
      </template>
      <!-- <img
        width="100%"
        :src="dialogImageFile.url"
        alt=""
      /> -->
      <el-image
        :src="dialogImageFile.url"
        fit="contain"
        :lazy="true"
        :preview-src-list="fileList.map((x) => x.url)"
      ></el-image>
    </el-dialog>
  </div>
</template>

<script>
  import {uploadUrl, host} from "@/api/base"; // w 导入图片上传接口

  export default {
    props: {
      inputFileList: {
        type: Array,
        default() {
          return [];
        },
      },
      inputAutoUpload: {
        type: Boolean,
        default: false,
      },
      originFileList: {
        type: Array,
        default() {
          return [];
        },
      },
      inputDisabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        uploadUrl,
        dialogImageFile: {
          name: "",
          url: "",
        },
        fileList: [],
        dialogVisible: false,
        disabled: this.inputDisabled,
        autoUpload: this.inputAutoUpload /** w判断是否开启自动上传 */,
        deleteUrl: [] /** w待删除的链接数组 */,
      };
    },
    mounted() {
      // console.log(this.$refs["upload"]);
    },
    updated() {
      // console.log("uplaod更新");
      this.fileList = this.inputFileList;
    },
    methods: {
      // f 上传提交
      handleSubmit() {
        // console.log("上传提交————");
        this.$refs["upload"].submit();
      },
      // f 清空
      handleClear() {
        this.$refs["upload"].clearFiles();
        this.fileList = [];
      },
      // f 文件列表变化钩子
      handleChange(file, fileList) {
        // console.log("文件列表发生变化————", file, fileList);
        // w 记录文件列表
        this.fileList = fileList;
        this.$emit("uploadChange", fileList);
        this.$emit("unUploadAmount", this.unUploadAmount);
      },
      // f 上传成功后的回调
      handleSucess(response, file, fileList) {
        // console.log("图片上传成功!", response, file, fileList);
        this.$message({
          type: "success",
          message: `文件“${file.name}”上传成功!`,
        });
      },
      // f 图片移除时的回调
      async handleRemove(file, fileList) {
        // console.log("图片删除!", file, fileList);
        let url = null;
        if (file.response) {
          url = new URL(host + "/" + file.response.url.slice(7)).href;
        } else {
          url = file.url;
        }
        if (!url) return;
        // w 记录要删除的文件url
        this.deleteUrl.push(url);
        // w 记录文件列表
        this.fileList = fileList;
        this.$emit("uploadChange", fileList);
      },
      // f 点击图片预览按钮时的回调
      handlePictureCardPreview(file) {
        this.dialogImageFile = JSON.parse(JSON.stringify(file));
        this.dialogVisible = true;
      },
      // f 通过调用接口删除url对应的文件
      async handleDeleteFile(url) {
        let res = await this.$api.uploadDeleteFile({
          url: url,
        });
        // w 返回结果(布尔值：用于判断是否删除成功)
        return res.data.status === 200;
      },
      // f 父组件保存时要调用的方法
      async parentHandleSave() {
        // w 删除deleteUrl中记录的url对应的文件
        this.deleteUrl.forEach((url) => this.handleDeleteFile(url));
      },
      // f 父组件取消时要调用的方法
      async parentHandleCouncil() {},
    },
    // f组件销毁时执行
    destroyed() {},
    computed: {
      // j 动态计算未上传文件数量
      unUploadAmount() {
        let amount = this.fileList.filter((x) => x.status != "success").length;
        // w 像父组件发送未上传数量
        this.$emit("unUploadAmount", amount);
        return amount;
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-flow: column nowrap;
    .buttonGroup {
      justify-self: center;
      align-self: center;
      padding: 0px;
    }
  }
  /deep/.el-upload-list__item-thumbnail {
    object-fit: cover;
  }
</style>
