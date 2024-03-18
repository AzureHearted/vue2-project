<template>
  <div class="container" ref="container">
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
    <div class="header" ref="header">
      <!-- s表单组件 -->
      <div class="form">
        <el-form
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          label-position="right"
          size="small">
          <el-form-item label="商品名称">
            <el-input
              v-model="formData.productName"
              placeholder="输入商品名称"
              @blur="inputBlur"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              type="date"
              v-model="formData.addTime"
              placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit"> 查询 </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮组 -->
      <div class="button-group">
        <el-button
          type="warning"
          icon="el-icon-plus"
          size="small"
          @click="toProductAddPage">
          添加商品
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="handleBatchDelete">
          批量删除
        </el-button>
      </div>
    </div>
    <!-- w 产品列表 -->
    <div class="content" ref="content">
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
        @selection-change="handleSelectionChange">
        <!-- 选择列 -->
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          min-width="75"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" min-width="80">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              :title="scope.row.title"
              trigger="hover"
              :open-delay="100"
              :close-delay="50"
              width="fit-content">
              <div slot="reference">
                <span
                  style="color: blue; cursor: pointer"
                  @click="toProductDetailPage(scope.row)">
                  {{ scope.row.title }}
                </span>
              </div>
              <div
                :style="{
                  display: 'flex',
                  justifyContent: 'center',
                }">
                <div
                  style="display: flex; flex-flow: row wrap; gap: 5px"
                  v-if="JSON.parse(scope.row.image).length">
                  <el-image
                    v-for="(item, index) in JSON.parse(scope.row.image)"
                    :key="index"
                    :src="item"
                    :alt="scope.row.title"
                    style="height: 128px; aspect-ratio: auto"
                    :preview-src-list="JSON.parse(scope.row.image)"></el-image>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          min-width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          min-width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="添加时间" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>
              {{ $moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sellPoint"
          label="商品卖点"
          min-width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商品描述" min-width="80" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- z 移除商品描述中的标签 -->
            {{ removeHTMLTag(scope.row.descs) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <!--
              z 这里的 slot-scope 中的 scope 可以获取当前行的数据通过 如scope.row 的方式行数据获取
            -->
          <template slot-scope="{$index,row}">
            <el-button
              class="mini"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit($index, row)">
              编辑
            </el-button>
            <el-button
              class="mini"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete($index, row)">
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
          @CurrentChange="hanldeCurrentChange"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from "@/components/pagination/Pagination.vue";
  import {removeHTMLTag} from "@/utils/common";
  import {mapMutations} from "vuex"; /** w 引入vuex的辅助函数 */

  export default {
    components: {Pagination},
    data() {
      return {
        // w 查询表单数据
        formData: {
          productName: "",
          addTime: "",
        },
        // w 列表数据
        tableData: [], // s 表单数据(数组对象)
        selectedIds: [], // s 用于记录选中的id列表
        // w 分页参数
        currentPage: 1, // s 当前页码
        total: 0, // s 条目总数
        pageSize: 10, // s 每页显示数量
      };
    },
    created() {
      // z 创建后获取第1页的表单数据
      this.getListInfo(1);
    },
    methods: {
      ...mapMutations("product", [
        "changeMode",
        "setRowData",
      ]) /** w vuex的组件绑定函数 */,
      removeHTMLTag, // w 注册方法
      // f 跳转到添加商品页面
      toProductAddPage() {
        console.log("跳转到添加商品页面——————");
        // w 传入一个空对象初始化store
        this.setRowData({});
        this.changeMode("add");
        this.$router.push({name: "productPage", params: {mode: "add"}});
      },
      // f 跳转到指定商品的编辑页面
      toProductEditPage(info) {
        console.log(`跳转到商品${info.id}的编辑页面——————`);
        // s 跳转编辑界面———— 方式1:通过路由传参
        // this.$router.push({name: "productPage", params: {id: info.id, mode: "edit"}});
        // s 跳转编辑界面———— 方式2:通过Vuex传参
        // w 存储当前行的数据-->跳转到商品页面-->获取行数据-->商品页面展示信息
        this.setRowData(info);
        this.changeMode("edit");
        this.$router.push({name: "productPage", params: {mode: "edit"}});
      },
      /** 跳转到指定商品的详情页
       * @param {Object} info 商品信息对象
       * @param {string} info.id 商品id
       */
      toProductDetailPage(info) {
        console.log(`跳转到商品${info.id}的详情页面——————`);
        this.setRowData(info);
        this.changeMode("show");
        this.$router.push({name: "productPage", params: {mode: "show"}});
      },
      // f 调用查询接口查询商品
      onSubmit() {
        // console.log("表单内容：", this.formData);
        this.search(this.formData.productName);
      },
      // f 处理编辑行
      handleEdit(index, row) {
        console.log("跳转到商品编辑页面——————", index, row);
        this.toProductEditPage(row);
      },
      // f 处理删除行
      handleDelete(index, row) {
        console.log("删除行：", index, row.id);
        this.$confirm("此操作将永久删除该商品信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await this.removeProductById(row.id);
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
      // f 处理删除行(批量)
      handleBatchDelete() {
        if (this.selectedIds.length < 1) {
          this.$message({
            type: "warning",
            message: "请选勾选要删除的商品信息!",
          });
          return;
        }
        console.log("删除多行(id)：", this.selectedIds);
        this.$confirm("此操作将永久删除所有选中的商品信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          title: "标题",
        })
          .then(async () => {
            let res = await this.batchRemoveProductById(this.selectedIds);
            // console.log("是否删除成功:", res.status);
            if (res.status === "success") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "warning",
                message: "删除失败!",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消批量删除",
            });
          });
      },
      // f 获取列表数据 page 页码
      async getListInfo(page) {
        const res = await this.$api.productList({page});
        // console.log(res.data);
        // s 分页数据&表单数据更新
        this.pageSize = res.data.pageSize;
        this.total = res.data.total;
        this.tableData = res.data.data;
      },
      // f 处理表单页码切换
      hanldeCurrentChange(page) {
        this.currentPage = page;
        this.getListInfo(page);
      },
      // f 商品查询接口
      async search(keyword) {
        if (!keyword) {
          // w 查询内容为空
          return;
        }
        let res = await this.$api.searchInfo({search: keyword});
        // console.log("查询结果：", res.data);
        if (res.data.status === 200) {
          // w 判断是否有数据
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
      // f 商品删除接口
      async removeProductById(id) {
        let res = await this.$api.removeProductById({id: id});
        // console.log(res.data);
        if (res.status === 200) {
          if (this.tableData.length - 1 === 0) {
            this.getListInfo(
              this.currentPage - 1 > 0 ? this.currentPage - 1 : this.currentPage
            );
          } else {
            this.getListInfo(this.currentPage);
          }
          // this.getListInfo(1)
        }
      },
      // f 商品批量删除接口
      async batchRemoveProductById(ids) {
        let res = await this.$api.batchRemoveProductById({ids});
        // console.log(res.data);
        if (res.status === 200) {
          if (this.tableData.length - ids.length === 0) {
            this.getListInfo(
              this.currentPage - 1 > 0 ? this.currentPage - 1 : this.currentPage
            );
          } else {
            this.getListInfo(this.currentPage);
          }
          return {status: "success"};
        } else {
          return {status: "fail"};
        }
      },
      // f input失去焦点时进行判断
      inputBlur() {
        if (!this.formData.productName) {
          this.getListInfo(1);
        }
      },
      // f 当table选中数据发生改变时同步跟新当前组件中的selectedIds
      handleSelectionChange(selection) {
        this.selectedIds = selection.map((x) => x.id);
        console.log("选项变化————", this.selectedIds, selection);
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
      .button-group {
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
      /deep/.mini {
        padding: 5px 10px;
      }
    }
  }
</style>
