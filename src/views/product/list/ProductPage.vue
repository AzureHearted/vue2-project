<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="category">
          <div class="title">产品类型列表</div>
          <!-- 树形组件 -->
          <div class="tree">
            <TreeProduct @nodeClick="handleNodeClick" />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="title">
            {{ title }}
          </div>
          <!-- 表单内容 -->
          <div class="form">
            <el-form
              ref="form"
              :model="form"
              label-width="100px"
              label-position="right"
              size="small"
              :rules="rules"
              :disabled="mode === 'show'"
            >
              <el-form-item
                label="所属分类"
                prop="category"
              >
                <span>{{ form.category }}</span>
              </el-form-item>
              <el-form-item
                label="商品名称"
                prop="title"
              >
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item
                label="商品价格"
                prop="price"
                required
              >
                <el-input-number
                  v-model="form.price"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="商品数量"
                prop="num"
                required
              >
                <el-input-number
                  v-model="form.num"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="商品卖点"
                prop="sellPoint"
              >
                <el-input v-model="form.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <UploadImg
                  ref="uploadImg"
                  :input-file-list="form.fileList"
                  @uploadChange="uploadChange"
                  @unUploadAmount="getUnuploadAmount"
                  :input-disabled="mode === 'show'"
                />
              </el-form-item>
              <el-form-item label="商品描述">
                <WangEditor
                  ref="wangEditor"
                  :input-html="form.descs"
                  @change="sendHtml"
                />
              </el-form-item>
              <el-form-item>
                <!-- 按钮组 -->
                <el-button-group>
                  <el-button
                    type="success"
                    @click="onSubmit"
                    v-if="mode === 'add' || mode === 'edit'"
                  >
                    保存
                  </el-button>
                  <el-button
                    v-if="mode === 'add' || mode === 'edit'"
                    @click="handleReset"
                    >重置</el-button
                  >
                  <el-button
                    type="primary"
                    @click="handleReturn"
                    :disabled="false"
                  >
                    返回
                  </el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations} from "vuex";
  import {host} from "@/api/base";
  import TreeProduct from "./TreeProduct.vue";
  import UploadImg from "./UploadImg.vue";
  import WangEditor from "./WangEditor.vue"; // w 导入wangEditor富文本编辑器组件
  import {getPathName} from "@/utils/common";

  export default {
    components: {
      UploadImg,
      TreeProduct,
      WangEditor,
    },
    data() {
      return {
        // w 表单数据
        form: {
          id: "", // w 编辑模式用
          category: "",
          cid: "",
          title: "",
          price: 0.0,
          num: 0,
          descs: "",
          sellPoint: "",
          image: [],
          fileList: [],
        },
        // w 表单验证规则
        rules: {
          title: [
            {
              required: true,
              message: "商品名称不能为空",
              trigger: "blur",
            },
          ],
          category: [
            {
              required: true,
              message: "商品所属分类不能为空",
              trigger: "blur",
            },
          ],
        },
        unUploadAmount: 0,
      };
    },
    computed: {
      ...mapGetters("product", ["title"]) /** w导入vuex的product仓库中的title getter */,
      ...mapState("product", ["mode", "rowData"]) /** w导入vuex的product仓库中的rowData数据 */,
    },
    created() {
      // ! 注意：如果要在create中读取ref必须使用 this.$nextTick()
      /**
       * * this.$nextTick() 在下次 DOM 更新循环结束之后执行延迟回调。
       * * 在修改数据之后立即使用这个方法，获取更新后的 DOM。 延迟加载
       */

      // this.$nextTick(() => {
      //   console.log("this.$refs.wangEditor", this.$refs.wangEditor);
      // });

      // w 通过vuex仓库获取title判断模式
      if (this.mode === "edit" || this.mode === "show") {
        // w 如果信息内容为空则跳转页面到商品列表页面
        if (Object.keys(this.rowData).length === 0) this.$router.push("/product/list");
        // s （编辑模式或查看模式）通过vuex仓库获取商品信息
        this.initData(this.rowData);
      }
    },
    methods: {
      ...mapMutations("product", ["setRowData"]),
      // f 返回
      handleReturn() {
        // this.$router.push("/product/list");
        this.$router.go(-1);
      },
      // f 表单重置
      handleReset() {
        // w 调用表单的组件的重置方法
        // this.$refs["form"].resetFields();
        this.form = JSON.parse(JSON.stringify(this.rowData)); /** s深拷贝 */
        // z 对一些信息进行手动重置(编辑模式下需要还原到原始状态,而不是清空)
        if (this.mode === "add") {
          this.form.cid = "";
          // w 重置图片上传列表
          this.form.fileList = [];
          // w 重置WangEditor内容
          this.$refs["wangEditor"].editor.clear();
        } else if (this.mode === "edit") {
          // console.log(this.$refs["uploadImg"], this.$refs["wangEditor"]);
          // w 重置图片上传列表
          this.form.fileList = JSON.parse(JSON.stringify(this.rowData.fileList));
          // w 重置WangEditor内容
          this.$refs["wangEditor"].html = this.rowData.descs;
        }
      },
      // f 提交表单——保存(新增和编辑两种模式)
      async onSubmit() {
        // console.log("表单提交——————", this.$refs["form"]);
        // w 先等待upload组件处理相关事件
        await this.$refs["uploadImg"].parentHandleSave();
        // w 最后验证表单信息
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.unUploadAmount === 0) {
              // w 信息验证无误则调用api进行表单提交
              if (this.mode == "add") {
                this.addProduct();
              } else if (this.mode == "edit") {
                this.updataProduct();
              }
            } else {
              this.$message({
                type: "warning",
                message: "你还有图片未上传,请点击上传按钮后再点击该按钮",
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "提交有误! 请检查表单信息",
            });
          }
        });
      },
      // f 新增商品表单提交(api调用)
      async addProduct() {
        // console.log("添加商品信息——————");
        let {title, image, sellPoint, price, cid, category, num, descs} = this.form;
        let res = await this.$api.addProduct({
          title,
          // w 需要进行JSON序列化处理转为字符串
          image: JSON.stringify(image),
          sellPoint,
          price,
          cid,
          category,
          num,
          descs,
        });
        console.log("添加商品信息——————表单上传结果:", res.data);
        if (res.data.status === 200) {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          // w 完成后通过路由跳转到商品列表页面(后续可能需要跳转到指定的列表页)
          this.$router.push("/product/list");
        } else {
          this.$message({
            type: "warning",
            message: "提交出错!",
          });
        }
      },
      // f (api调用)更新商品信息
      async updataProduct() {
        // console.log("更新商品信息——————");
        let {id, title, image, sellPoint, price, cid, category, num, descs} = this.form;
        let res = await this.$api.updateProduct({
          id,
          title,
          // w 需要进行JSON序列化处理转为字符串
          image: JSON.stringify(image),
          sellPoint,
          price,
          cid,
          category,
          num,
          descs,
        });
        console.log("更新商品信息——————表单上传结果:", res.data);
        if (res.data.status === 200) {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          // w 完成后通过路由跳转到商品列表页面(后续可能需要跳转到指定的列表页)
          this.$router.push("/product/list");
        } else {
          this.$message({
            type: "warning",
            message: "提交出错!",
          });
        }
      },
      // f 通过vuex仓库获取商品信息
      async initData(rawData) {
        // s 将信息赋值给组件form对象对应的属性值
        // w 分别获取两个对象的key
        const formKey = Object.keys(this.form);
        const infoKey = Object.keys(rawData);
        // w 获取两个对象共有的属性集合(交集)
        const commonKeys = new Set(
          [...formKey, ...infoKey].filter((key) => formKey.includes(key) && infoKey.includes(key))
        );
        // w 仅将两个对象中相同的属性值赋值给from对象
        commonKeys.forEach((key) => {
          // ! 如果是image属性值是否为字符串,如果是字符串则进行JSON解析
          if (key === "image" && typeof rawData[key] === "string") {
            // console.log(this.form[key], JSON.parse(this.form[key]));
            // console.log("加载中…………");
            this.form[key] = JSON.parse(rawData[key]);
            return;
          }
          this.form[key] = rawData[key];
        });
        // w 生成upload能识别的图片文件数组格式
        this.form.fileList = this.form.image.map((x, index) => {
          return {
            uid: index + 1,
            name: getPathName(x),
            url: x,
            status: "success",
          };
        });
        // w 更新rowData
        this.setRowData(JSON.parse(JSON.stringify(this.form)));
      },
      // f 处理树形列表节点点击事件
      handleNodeClick(rawData) {
        // console.log("点击了节点", "原始数据:", rawData, "节点对象:", vNode, "Tree对象:", tree);
        this.form.category = rawData.name;
        this.form.cid = rawData.cid;
      },
      // f 图片上组件中的文件变化时的回调
      uploadChange(fileList) {
        // console.log("upload组件内文件变化", fileList);
        this.form.fileList = fileList;
      },
      // f 接收获取wangEditor中的内容
      sendHtml(val) {
        this.form.descs = val;
      },
      // f 接收upload组件中未上传的文件数量
      getUnuploadAmount(val) {
        // console.log("未上传文件数量：", val);
        this.unUploadAmount = val;
      },
    },
    watch: {
      "form.fileList": {
        handler(val, oldVal) {
          // console.log("fileList变化", val);
          this.form.image = val.map((x) => {
            if (x.response) {
              let url = x.response.url;
              // console.log("当前处理对象:", x);
              console.log("当前host:", host);
              return new URL(host + "/" + url.slice(7)).href;
            } else {
              return x.url;
            }
          });
        },
      },
      deep: true,
    },
  };
</script>
<style lang="less" scoped>
  .container {
    .category {
      // height: 600px;
      background: #fff;
      .title {
        background: skyblue;
        color: white;
        padding: 20px;
      }
      .tree {
        padding: 10px;
      }
    }
    .content {
      // height: 800px;
      background: #fff;
      .title {
        background: #eee;
        padding: 14px;
        color: #333;
        font-weight: bold;
      }
      .form {
        padding: 20px 20px 10px 5px;
      }
    }
  }
</style>
