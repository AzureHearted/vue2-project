<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="category">
          <div class="title">产品类型列表</div>
          <!-- 树形组件 -->
          <div class="tree">
            <!-- <el-tree
              :data="categoryData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              accordion
            ></el-tree> -->
            <TreeProduct @nodeClick="handleNodeClick" />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div class="title">
            <span v-if="mode === 'add'">添加商品信息</span>
            <span v-else-if="mode === 'edit'">编辑商品信息</span>
            <span v-else>查看商品信息</span>
          </div>
          <!-- 表单内容 -->
          <div class="form">
            <el-form
              ref="form"
              :model="form"
              label-width="100px"
              label-position="right"
              size="small"
            >
              <el-form-item
                label="所属分类"
                required
              >
                {{ form.category }}
              </el-form-item>
              <el-form-item
                label="商品名称"
                required
              >
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item
                label="商品价格"
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
                required
              >
                <el-input-number
                  v-model="form.num"
                  controls-position="right"
                  :min="0"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="商品卖点">
                <el-input v-model="form.sellPoint"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <UploadImg @uploadSucess="uploadSucess" />
              </el-form-item>
              <el-form-item label="商品描述"> </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button>重置</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- z测试区域-->
          <div class="test">
            <el-image
              :src="testUrl"
              fit="cover"
              :lazy="true"
            ></el-image>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import TreeProduct from "./TreeProduct.vue";
  import UploadImg from "./UploadImg.vue";

  export default {
    components: {
      UploadImg,
      TreeProduct,
    },
    data() {
      return {
        mode: "edit",
        defaultProps: {
          label: "name",
          children: "children",
        },
        categoryData: [],
        //w 表单数据
        form: {
          category: "",
          cid: "",
          title: "",
          price: 0.0,
          num: 0,
          descs: "",
          sellPoint: "",
          image: [],
          paramsInfo: "",
        },
        //z 测试路径
        testUrl: "",
      };
    },
    created() {
      // console.log(this.$route);
      this.mode = this.$route.params.mode; //w 获取路由参数中的mode参数给组件mode变量
      this.getItemCategory(); //w 获取类目信息
    },
    methods: {
      //f 获取类目信息
      async getItemCategory() {
        let res = await this.$api.itemCategory();
        if (res.status === 200) {
          // console.log("原始数据", res.data.result);
          // console.log("处理后的数据", this.processingRowCategoryInfo(res.data.result));
          this.categoryData = this.processingRowCategoryInfo(res.data.result);
        }
      },
      //f 加工原始类目信息
      processingRowCategoryInfo(raw = []) {
        let info = [];
        //w 获取一级类别并生成一级对象数组
        info = raw.filter((x) => x.type === 1);

        //w 分别记录每个一级类别的子类
        info.forEach((main) => {
          main.children = raw.filter((x) => x.type === main.cid);
        });
        // console.log("一级类别", info);
        return info;
      },
      //f 处理树形列表节点点击事件
      handleNodeClick(rawData, vNode, tree) {
        // console.log("点击了节点", "原始数据:", rawData, "节点对象:", vNode, "Tree对象:", tree);
        this.form.category = rawData.name;
        this.form.cid = rawData.cid;
      },
      //f 图片上传成功后的回调
      uploadSucess(newImgUrl, image) {
        // console.log("图片上传成功!", "新图片路径：", newImgUrl, "图片路径列表", image);
        this.form.image = image; //w 更新图片数组
      },
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
      height: 800px;
      background: #fff;
      .title {
        background: #eee;
        padding: 14px;
        color: #333;
        font-weight: bold;
      }
      .form {
        padding: 20px;
      }
    }
  }
</style>
