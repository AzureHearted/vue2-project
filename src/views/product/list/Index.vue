<template>
  <div
    class="container"
    ref="container"
  >
    <!-- w产品搜索 -->
    <!-- 
      el-form 表单
        :inline="true" 设置inline可以让表单域变为行内的表单域
        :model="formInline" 表单数据对象 object

      el-form-item 表单项
        label 表示表单项的名称

      el-input 表单输入框

      el-date-picker 日期选择组件
    -->
    <div
      class="header"
      ref="header"
    >
      <!-- s表单组件 -->
      <div class="form">
        <el-form
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          label-position="right"
          size="small"
        >
          <el-form-item label="商品名称">
            <el-input
              v-model="formData.productName"
              placeholder="输入商品名称"
              @blur="inputBlur"
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
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="small"
        >
          添加商品
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
        >
          批量删除
        </el-button>
      </div>
    </div>
    <!-- w产品列表 -->
    <div
      class="content"
      ref="content"
    >
      <!-- s组件el-table -->
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        height="100%"
        border
        :header-cell-style="{color: '#333', textAlign: 'center'}"
        :cell-style="{textAlign: 'center'}"
        highlight-selection-row
      >
        <!-- 选择列 -->
        <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="商品名称"
        >
          <template slot-scope="scope">
            <el-popover
              placement="top"
              :title="scope.row.title"
              trigger="hover"
              :open-delay="500"
              :close-delay="100"
            >
              <span slot="reference">{{ scope.row.title }}</span>
              <div
                :style="{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }"
              >
                <el-image
                  v-if="JSON.parse(scope.row.image).length"
                  :src="JSON.parse(scope.row.image)[0]"
                  :alt="scope.row.title"
                  fit="fit"
                  style="width: 100px; height: 100px"
                ></el-image>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="120"
        >
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>
              {{ $moment(scope.row.create_time).format("YYYY年MM月DD HH:mm:ss") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="商品描述"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <!-- z 移除商品描述中的标签 -->
            {{ removeHTMLTag(scope.row.descs) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <!--
              z 这里的 slot-scope 中的 scope 可以获取当前行的数据通过 如scope.row 的方式行数据获取
            -->
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- s分页组件 -->
      <div class="pagination-container">
        <Pagination
          :total="total"
          :pageSize="pageSize"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          @CurrentChange="hanldeCurrentChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from "@/components/pagination/Pagination.vue";
  import {removeHTMLTag} from "@/utils/common";

  export default {
    components: {Pagination},
    data() {
      return {
        //w 查询表单数据
        formData: {
          productName: "",
          addTime: "",
        },
        //w 列表数据
        tableData: [], //s 表单数据(数组对象)
        //w 分页参数
        currentPage: 1, //s 当前页码
        total: 40, //s 条目总数
        pageSize: 10, //s 每页显示数量
        test: 10,
      };
    },
    created() {
      //z 创建后获取第1页的表单数据
      this.getListInfo(1);
    },
    methods: {
      removeHTMLTag, //w 注册方法
      //f 调用查询接口查询商品
      onSubmit() {
        // console.log("表单内容：", this.formData);
        this.search(this.formData.productName);
      },
      //f 处理编辑行
      handleEdit(index, row) {
        console.log("编辑行：", index, row);
      },
      //f 处理删除行
      handleDelete(index, row) {
        console.log("删除行：", index, row.id);
        this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.removeProductById(row.id);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      //f 获取列表数据 page 页码
      async getListInfo(page) {
        const res = await this.$api.productList({page});
        // console.log(res.data);
        //s 分页数据&表单数据更新
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        this.tableData = res.data.data;
      },
      //f 处理表单页码切换
      hanldeCurrentChange(page) {
        this.currentPage = page;
        this.getListInfo(page);
      },
      //f 商品查询接口
      async search(keyword) {
        if (!keyword) {
          //w 查询内容为空
          return;
        }
        let res = await this.$api.searchInfo({search: keyword});
        // console.log("查询结果：", res.data);
        if (res.data.status === 200) {
          //w 判断是否有数据
          this.tableData = res.data.result;
          this.total = res.data.result.length;
          //j 这里如果数据过多必须进行分页处理，但目后端并未进行查询的分页处理
          //j 因此要么在前端进行分页处理、要么在后端进行分页处理
          this.pageSize = res.data.result.length;
        } else {
          this.tableData = [];
          this.total = 0;
          this.pageSize = 1;
        }
      },
      //f 商品删除接口
      async removeProductById(id) {
        let res = await this.$api.removeProductById({id: id});
        console.log(res.data);
        if (res.status === 200) {
          if (this.tableData.length === 1) {
            this.getListInfo(this.currentPage - 1);
          } else {
            this.getListInfo(this.currentPage);
          }
          // this.getListInfo(1)
        }
      },
      //f input失去焦点时进行判断
      inputBlur() {
        if (!this.formData.productName) {
          this.getListInfo(1);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    .header {
      height: 100px;
      background: #fff;
      margin-bottom: 10px;
      padding: 10px;
      .group {
        border: 1px solid #eee;
        padding: 8px;
      }
    }
    .content {
      height: calc(100% - 100px - 10px - 20px - 32px - 20px);
      background: #fff;
      .pagination-container {
        padding: 10px;
      }
    }
  }
</style>
