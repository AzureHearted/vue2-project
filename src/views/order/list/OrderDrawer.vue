<template>
  <el-drawer
    :title="title"
    :visible="show"
    :direction="direction"
    :before-close="handleClose"
    :modal="false"
    :size="size"
    destroy-on-close>
    <div class="container">
      <!-- s顶部信息表单 -->
      <div class="form">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form
              :model="formData"
              label-width="80px"
              size="small"
              :inline="true">
              <el-form-item label="订单编号">
                <el-input :value="formData.code"> </el-input>
              </el-form-item>
              <el-form-item label="下单时间">
                <el-input
                  :value="
                    dayjs(formData.created).format('YYYY-MM-DD hh:mm:ss')
                  ">
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form
              :model="formData"
              label-width="80px"
              size="small"
              :inline="true">
              <el-form-item label="下单人">
                <el-input :value="formData.ordername"> </el-input>
              </el-form-item>
              <el-form-item label="预定时间">
                <el-input
                  :value="dayjs(formData.yudingTime).format('YYYY-MM-DD')">
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form
              :model="formData"
              label-width="80px"
              size="small"
              :inline="true">
              <el-form-item label="所属单位">
                <el-input :value="formData.company"> </el-input>
              </el-form-item>
              <el-form-item label="汇总状态">
                <!-- <el-tag
                  :type="formData.huizongStatus === 1 ? 'info' : 'success'">
                  {{ formData.huizongStatus === 1 ? "未汇总" : "已汇总" }}
                </el-tag> -->
                <el-input
                  :value="formData.huizongStatus === 1 ? '未汇总' : '已汇总'">
                </el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form
              :model="formData"
              label-width="80px"
              size="small"
              :inline="true">
              <el-form-item label="联系电话">
                <el-input :value="formData.phone"> </el-input>
              </el-form-item>
              <el-form-item label="订单总价">
                <el-input :value="formData.price"> </el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <!-- s表单 -->
      <div class="table">
        <el-table
          class="table"
          :data="formData.list"
          style="width: 100%"
          border
          :header-cell-style="{color: '#333', textAlign: 'center'}"
          :cell-style="{textAlign: 'center'}"
          highlight-selection-row>
          <!-- 选择列 -->
          <el-table-column label="产品名称" prop="title"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="规格" prop="guige"></el-table-column>
          <el-table-column label="数量" prop="num"></el-table-column>
          <el-table-column label="小计（元）" prop="sum"></el-table-column>
        </el-table>
      </div>
      <!-- s底部表单 -->
      <div class="bottom-form">
        <el-form
          :model="formData"
          label-width="80px"
          size="small"
          :inline="true">
          <el-form-item label="订单审核">
            <el-checkbox :value="formData.pass" label="通过"></el-checkbox>
          </el-form-item>
          <el-form-item label="审核人">
            <el-input
              :value="formData.shenhename"
              style="width: 80px"></el-input>
          </el-form-item>
          <el-form-item label="审核时间">
            <el-input :value="formData.time"></el-input>
          </el-form-item>
          <el-form-item label="审核意见" style="display: unset">
            <div>
              <el-input
                :value="formData.suggestion"
                type="textarea"
                style="width: 490px"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- s底部按钮 -->
      <div class="button-group">
        <el-button type="primary" size="small" @click="handleClose">
          关闭
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  import dayjs from "dayjs"; // s 引入Day.js
  import {mapState, mapMutations} from "vuex";

  /** 表单数据结构定义
   * @typedef  {object} inlineForm 内敛表单对象
   * @property {number} id id
   * @property {string} code 订单编号
   * @property {string} created 创建时间
   * @property {string} yudingTime 预定时间
   * @property {string} ordername 下单人
   * @property {string} company 所属单位
   * @property {number} phone 联系电话
   * @property {number} price 订单总价格
   * @property {1 | 2} huizongStatus 汇总状态
   * @property {string} shenhename 审核人
   * @property {string} time 审核时间
   * @property {Boolen} pass 是否通过
   * @property {string} suggestion 审核意见
   * @property {rowData[]} list 表格数据
   */

  /** 表格数据结构定义
   * @typedef  {object} rowData 表格条目对象
   * @property {string} title 产品名称
   * @property {number} price 价格
   * @property {number} guige 规格
   * @property {number} num 数量
   * @property {number} sum 小计
   */

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      direction: {
        type: String,
        default: "rtl",
      },
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        title: "订单详情",
        show: this.visible,
        /** 抽屉内敛表单数据
         *  @type {inlineForm} */
        formData: {},
      };
    },
    created() {
      if (this.id > 0) {
        this.getOrderDetil(this.id);
      }
    },
    computed: {
      ...mapState({
        menuIsCollapse: "menuIsCollapse",
      }),
      size: function () {
        // w根据左侧菜单是否收缩来判断抽屉宽度
        if (this.menuIsCollapse) {
          return "calc(100% - 64px)";
        } else {
          return "calc(100% - 200px)";
        }
      },
    },
    methods: {
      dayjs, // w 注册day.js的方法
      /** 点击抽屉关闭按钮时的回调
       * @param {Function} done 关闭抽屉的函数
       */
      handleClose(done) {
        this.show = false;
        this.$emit("visibleReturn", false);
        if (!done) {
          done();
        }
      },
      /** 获取抽屉数据
       * @param {number} id 订单id
       */
      async getOrderDetil(id) {
        let res = await this.$api.orderDetail({id});
        if (res.data.status === 200) {
          // console.log('请求成功!',res.data);
          this.formData = res.data.result;
        } else {
          console.log("没有对应数据");
        }
      },
    },
    watch: {
      visible: {
        handler(val, oldVal) {
          // console.log(val, oldVal);
          this.show = val;
          this.getOrderDetil(this.id);
        },
      },
      id(val, oldVal) {
        // console.log("id变化");
        this.getOrderDetil(val);
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-flow: column;
    padding: 10px 10px 0 10px;
    gap: 8px;
    // background: green;

    --inner-padding: 8px;
    .form {
      padding: var(--inner-padding);
      border: 1px solid #eee;
    }
    .bottom-form {
      padding: var(--inner-padding);
      // border: 1px solid #eee;
    }
    .button-group {
      position: sticky;
      padding: var(--inner-padding);
      bottom: 0px;
      background: white;
      // border: 1px solid #eee;
      z-index: 1;
    }
  }
</style>
