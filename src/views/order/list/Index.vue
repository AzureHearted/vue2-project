<template>
  <div class="container">
    <!-- w 面包屑 -->
    <Breadcrumb></Breadcrumb>
    <!-- w 内容容器 -->
    <div class="wrapper">
      <div class="header">
        <!-- s表单组件 -->
        <div class="form">
          <el-form
            :inline="true"
            :model="formData"
            class="demo-form-inline"
            label-position="right"
            size="small">
            <el-form-item label="订单编号">
              <el-input
                v-model="formData.orderNumber"
                placeholder="输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="预定时间">
              <el-date-picker
                type="date"
                v-model="formData.orderTime"
                placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 查询 </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- s 按钮组 -->
        <div class="button-group">
          <el-button type="warning" size="small" @click="orderSummary">
            订单汇总
          </el-button>
          <download-excel
            :data="excle.DetailsForm"
            :fields="excle.json_fields"
            :header="excle.title"
            :name="excle.name"
            :fetch="orderExportToExcel">
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
          <el-table-column
            type="selection"
            width="40"
            :selectable="(row, index) => row.huizongStatus === 1">
            <!-- 这里返回值(Boolen)决定了是否启用checkbox选择功能 -->
          </el-table-column>
          <el-table-column
            prop="code"
            label="订单编号"
            min-width="100"
            show-overflow-tooltip>
            <span
              slot-scope="{row}"
              style="color: blue; cursor: pointer"
              @click="handleClickDetil(row)">
              {{ row.code }}
            </span>
          </el-table-column>
          <el-table-column
            prop="ordername"
            label="下单人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="company"
            label="所属单位"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="预定时间" min-width="100">
            <template slot-scope="{row}">
              <span>
                <!-- {{ $moment(scope.row.yudingTime).format("YYYY-MM-DD") }} -->
                {{ dayjs(row.yudingTime).format("YYYY-MM-DD") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="订单总价格"
            min-width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="huizongStatus"
            label="汇总状态"
            show-overflow-tooltip>
            <template slot-scope="{row}">
              <!-- s 标签 -->
              <el-tag
                :type="row.huizongStatus === 1 ? '' : 'success'"
                size="normal"
                effect="light">
                {{ row.huizongStatus === 1 ? "未汇总" : "已汇总" }}
              </el-tag>
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
            @CurrentChange="hanldeCurrentChange" />
        </div>
      </div>
      <!-- s抽屉组件 -->
      <OrderDrawer
        :id="showId"
        :visible="visibleDrawer"
        @visibleReturn="(val) => (visibleDrawer = val)">
      </OrderDrawer>
    </div>
  </div>
</template>

<script>
  import Pagination from "@/components/pagination/Pagination.vue";
  import OrderDrawer from "./OrderDrawer.vue";
  import dayjs from "dayjs"; // s 引入Day.js

  /** 数据结构定义
   * @typedef  {object} rowData 表格条目对象
   * @property {number} id id
   * @property {number} code 订单编号
   * @property {string} ordername 下单人
   * @property {string} company 所属单位
   * @property {number} phone 联系电话
   * @property {string} yudingTime 预定时间
   * @property {number} price 订单总价格
   * @property {1 | 2} huizongStatus 汇总状态
   *
   */

  export default {
    components: {Pagination, OrderDrawer},
    data() {
      return {
        // w 查询表单数据
        formData: {
          orderNumber: null,
          orderTime: "",
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
        visibleDrawer: false,
        /** 要显示的订单详情id */
        showId: -1,
        /** 用于记录要导出excle相关信息 */
        excle: {
          name: "采购公司订单列表",
          title: "采购公司订单列表",
          json_fields: {
            订单编号: {
              field: "code",
              callback(val) {
                // ! 数字过长的处理防止导入excel后显示为科学计数法
                return "&nbsp;" + val; //&nbsp;表示空格
                // return val;
              },
            },
            下单人: "ordername",
            所属单位: "company",
            联系电话: {
              field: "phone",
              callback(val) {
                return "&nbsp;" + val;
              },
            },
            预定时间: {
              field: "yudingTime",
              callback(val) {
                return dayjs(val).format("YYYY-MM-DD");
              },
            },
            订单总价格: "price",
            汇总状态: {
              field: "huizongStatus",
              callback(val) {
                return val === 1 ? "未汇总" : "已汇总";
              },
            },
          },
          DetailsForm: [],
        },
      };
    },
    created() {
      this.getOrderData(1);
    },
    methods: {
      dayjs, // w 注册day.js的方法
      /** 查询 */
      onSubmit() {
        console.log("查询", this.formData);
      },
      /** 选项发生变化时的回调
       *  @abstract 当table选中数据发生改变时同步跟新当前组件中的selectedIds
       *  @param {rowData[]} selection 选项对象数组
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
        this.getOrderData(page);
      },
      /** (api调用)获取订单数据
       * @param {number} page
       */
      async getOrderData(page) {
        let res = await this.$api.getOrderList({page});
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
      /** 汇总订单 */
      async orderSummary() {
        // console.log("汇总订单", this.selectedIds);
        if (this.selectedIds.length < 2) {
          await this.$alert("汇总订单至少需要2条订单信息", "汇总订单", {
            callback: (action) => {},
          });
          return;
        }
        // console.log(this.selectedIds.toString(','));
        let res = await this.$api.changeListStatus({
          ids: this.selectedIds.toString(","),
        });
        // console.log(res.data);
        if (res.data.status === 200) {
          this.$message({
            type: "success",
            message: "汇总成功!",
          });
          // w 完成后刷新数据
          this.getOrderData(this.currentPage);
        }
      },
      /** 导出订单 */
      orderExportToExcel() {
        return this.tableData;
      },
      /** 抽屉关闭 */
      beforeCloseDrawer(done) {
        console.log("抽屉关闭");
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
      },
      /** 处理点击详情链接
       * @param {rowData} row 选项对象
       */
      handleClickDetil(row) {
        this.showId = row.id;
        // 展示抽屉
        this.visibleDrawer = true;
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    padding: 0 10px 10px 10px;
    height: fit-content;
    .wrapper {
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
      }
    }
  }
</style>
