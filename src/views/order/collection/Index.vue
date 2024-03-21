<template>
  <div class="container">
    <!-- w 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- w 内容容器 -->
    <div class="warpper">
      <div class="header">
        <!-- s表单组件 -->
        <div class="form">
          <el-form
            :inline="true"
            :model="formData"
            class="demo-form-inline"
            label-position="right"
            size="small">
            <el-form-item label="预定编号">
              <el-input
                v-model="formData.orderCollectNumber"
                placeholder="输入预定编号"></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-date-picker
                type="date"
                v-model="formData.orderCollectTime"
                placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 查询 </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- s 按钮组 -->
        <div class="button-group">
          <download-excel
            :data="excle.DetailsForm"
            :fields="excle.json_fields"
            :header="excle.title"
            :name="excle.name"
            :fetch="orderCollectExportToExcel">
            <el-button type="warning" size="small"> 导出 </el-button>
          </download-excel>
        </div>
      </div>
      <div class="content">
        <!-- s组件el-table -->
        <el-table
          class="table"
          :data="tableData"
          style="width: 100%"
          border
          :header-cell-style="{color: '#333', textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
          highlight-selection-row
          @selection-change="handleSelectionChange">
          <!-- 选择列 -->
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column
            prop="orderNum"
            label="汇总单编号"
            min-width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="operator" label="汇总人" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            min-width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="汇总时间" min-width="100">
            <template slot-scope="scope">
              <span>
                {{
                  $moment(scope.row.yudingTime).format("YYYY-MM-DD hh:mm:ss")
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="汇总单总价格"
            min-width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <!--
              z 这里的 slot-scope 中的 scope 可以获取当前行的数据通过 如scope.row 的方式行数据获取
            -->
            <template slot-scope="{$index, row}">
              <el-button
                class="mini"
                type="danger"
                size="mini"
                @click="undoSummary($index, row)">
                撤销汇总
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
  </div>
</template>

<script>
  import Pagination from "@/components/pagination/Pagination.vue";
  /** 数据结构定义
   * @typedef  {object} rowData 表格条目对象
   * @property {number} id 汇总订单id
   * @property {number} orderNum 汇总订单编号
   * @property {string} operator 汇总人
   * @property {number} phone 联系电话
   * @property {string} time 汇总时间
   * @property {number} totalPrice 汇总单总价格
   * @property {string} ids 汇总的订单id记录字符串
   */
  export default {
    components: {Pagination},
    data() {
      return {
        // w 查询表单数据
        formData: {
          orderCollectNumber: null,
          orderCollectTime: "",
        },
        // w 表格相关
        /** 表格数据列表
         * @type {rowData[]} */
        tableData: [],
        /** 用于记录选中的id列表
         * @type {number[]} */
        selectedIds: [],
        // w 分页参数
        /** 当前页码 */
        currentPage: 1,
        /** 条目总数 */
        total: 0,
        /** 每页显示数量 */
        pageSize: 10,
        /** 抽屉显示控制 */
        drawerShow: true,
        /** 用于记录要导出excle相关信息 */
        excle: {
          name: "采购公司汇总订单列表",
          title: "采购公司汇总订单列表",
          json_fields: {
            汇总订单编号: "orderNum",
            汇总人: "operator",
            联系电话: {
              field: "phone",
              callback(val) {
                return "&nbsp;" + val;
              },
            },
            汇总时间: {
              field: "time",
              callback: (val) => {
                return this.$moment(val).format("YYYY-MM-DD");
              },
            },
            汇总单总价格: "totalPrice",
          },
          DetailsForm: [],
        },
      };
    },
    created() {
      this.getOrderCollectData(1);
    },
    methods: {
      async getOrderCollectData(page) {
        let res = await this.$api.orderCollectList({page});
        // console.log(res.data.data);
        if (res.data.status === 200) {
          this.tableData = res.data.data;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
        } else {
          this.tableData = [];
          this.pageSize = 1;
          this.total = 0;
        }
      },
      /** 查询 */
      onSubmit() {
        console.log("查询", this.formData);
      },
      /** 导出 */
      orderCollectExportToExcel() {
        // console.log("导出汇总订单", this.tableData);
        if (this.selectedIds.length > 0) {
          return this.tableData.filter((x) => this.selectedIds.includes(x.id));
        } else {
          return this.tableData;
        }
      },
      /** 选项发生变化时的回调
       *  @abstract 当table选中数据发生改变时同步跟新当前组件中的selectedIds
       *  @param {rowData[]} selection 选项对象
       */
      handleSelectionChange(selection) {
        this.selectedIds = selection.map((x) => x.id);
        // console.log("选项变化————", this.selectedIds, selection);
      },
      /** 处理表单页码切换
       *  @param {number} page 页码
       */
      hanldeCurrentChange(page) {
        this.currentPage = page;
        this.getOrderCollectData(page);
      },
      /** 处理撤销汇总
       * @param {number} index 行下标
       * @param {rowData} row 表单行数据对象
       */
      undoSummary(index, row) {
        // console.log("撤销汇总", index, row);
        let {id, orderNum} = row;
        this.$confirm(`(汇总单编号:${orderNum}) 确认撤销该汇总订单?`, "提示")
          .then(async () => {
            let res = await this.$api.cancelOrderCollect({id});
            // console.log(res.data);
            if (res.data.status === 200) {
              this.getOrderCollectData(this.currentPage); // w 更新数据
              this.$message({
                type: "success",
                message: "撤销成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "撤销出错!",
              });
            }
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "已取消操作",
            // });
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 10px 10px 10px;
    height: fit-content;
    .warpper {
      .header {
        // height: 100px;
        background: #fff;
        margin-bottom: 10px;
        padding: 10px;
        .button-group {
          border: 1px solid #eee;
          padding: 8px;
          // w 样式修正
          > * {
            display: inline-block;
          }
          > :not(:first-child) {
            margin-left: 10px;
          }
        }
      }
      .content {
        background: #fff;
        .pagination-container {
          padding: 10px;
        }
        /deep/.mini {
          padding: 5px 10px;
        }
      }
    }
  }
</style>
