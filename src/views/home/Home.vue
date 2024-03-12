<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ totalData.saleTotal }}</div>
        <div class="bottom">今日销售额：{{ totalData.sale | num }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ totalData.viewsTotal }}</div>
        <div class="bottom">今日访问量：{{ totalData.views | num }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ totalData.collectTotal }}</div>
        <div class="bottom">今日收藏量：{{ totalData.collect | num }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ totalData.payTotal }}</div>
        <div class="bottom">今日支付量：{{ totalData.pay | num }}</div>
      </div>
    </div>
    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div
        class="time-info"
        id="box13"
      >
        <div class="title">月销售额</div>
        <div
          id="chartsLine"
          style="width: 100%; height: 300px"
        ></div>
      </div>
      <div
        class="area"
        id="box1"
      >
        <div class="title">产品销售比例</div>
        <div
          id="chartsPie"
          style="width: 100%; height: 300px"
        ></div>
      </div>
    </div>
    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import * as echarts from "echarts"; //f 引入echarts

  export default {
    data() {
      return {
        totalData: {}, //首页数据统计
        orderData: {}, //订单统计信息
        chartData: {}, //首页图表信息
      };
    },
    created() {
      // console.log("Home页创建");
      //f 页面创建时调用api获取首页信息数据
      // console.log("created-id", document.getElementById("chartsLine"));
      this.totalInfo();
      this.orderInfo();
      this.chartInfo(); //s 获取数据后绘制图表
    },
    mounted() {
      // console.log("Home页挂载");
      //s 最早可以或DOM元素的生命周期函数 挂载完毕
      // console.log("id", document.getElementById("chartsLine"));
      // this.totalInfo();
      // this.orderInfo();
      // this.chartInfo(); //s 获取数据后绘制图表
    },
    updated() {
      // console.log("Home更新");
    },
    methods: {
      //f 从api获取首页信息
      async totalInfo() {
        let res = await this.$api.totalInfo();
        // console.log("首页统计信息---", res.data.data.list);
        this.totalData = res.data.data.list;
      },
      //f 从api获取首页订单信息
      async orderInfo() {
        let res = await this.$api.orderInfo();
        // console.log("订单信息---", res.data.list);
        this.orderData = res.data.list;
      },
      //f 从api获取首页折线图数据统计 月销量、月销售额并且绘制图表
      async chartInfo() {
        let res = await this.$api.chartInfo();
        console.log("图表信息---", res.data.result.data);
        this.chartData = res.data.result.data;
        //s 加工数据
        let nameList = this.chartData.sale_money.map((x) => x.name);
        let saleNum = this.chartData.sale_money.map((x) => x.num);
        let saleAmount = this.chartData.sale_money.map((x) => x.total_amount);
        let pieData = this.chartData.sale_money.map((x) => {
          return {
            name: x.name,
            value: x.total_amount,
          };
        });
        //s 绘制曲线图和柱状图
        this.drawChart(nameList, saleNum, saleAmount);
        //s 绘制饼图
        this.drawPie(nameList, pieData);
      },
      //f 绘制折线图表
      drawChart(nameList, saleNum, saleAmount) {
        // 基于准备好的dom，初始化echarts实例
        const dom = document.getElementById("chartsLine");
        if (!dom) return;//没拿到dom就停止操作
        let myChart = echarts.init(dom);
        // 绘制图表
        myChart.setOption({
          // title: {//标题
          //   text: "ECharts 入门示例",
          // },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            //横坐标
            data: nameList,
            axisLine: {
              //坐标轴相关设置
              lineStyle: {
                // color: "skyblue", //轴线颜色
              },
            },
            axisTick: {
              //坐标轴刻度
              alignWithLabel: true,
            },
          },
          yAxis: {}, //纵坐标 - 会自动创建数据
          legend: {
            data: ["销售额", "销售量"],
          },
          series: [
            //图表内容
            {
              name: "销售额",
              type: "line", //bar：柱状图,line：折线图,pie：饼图,map：地图
              data: saleAmount,
              smooth: true, //曲线是否平滑
              focus: "series",
            },
            {
              name: "销售量",
              type: "bar", //bar：柱状图,line：折线图,pie：饼图,map：地图
              data: saleNum,
              focus: "series",
            },
          ],
        });
      },
      //f 绘制饼图
      drawPie(nameList, data) {
        // 基于准备好的dom，初始化echarts实例
        const dom = document.getElementById("chartsPie");
        if (!dom) return;//没拿到dom就停止操作
        var myChart = echarts.init(dom);
        // 绘制图表
        myChart.setOption({
          // title: {//标题
          //   text: "ECharts 入门示例",
          // },
          tooltip: {
            trigger: "item",
            formatter: "{a}</br>{b}：{d}%",
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            top: 0,
            left: 0,
            data: nameList,
          },
          series: [
            //图表内容
            {
              type: "pie", //bar：柱状图,line：折线图,pie：饼图,map：地图
              name: "产品销售额",
              radius: "50%",
              center: ["50%", "50%"],
              data: data,
            },
          ],
        });
      },
    },
    //f 过滤器--数据格式处理
    filters: {
      num(value) {
        // 23466 -- 23,466
        if (!value) return value;
        return value.toLocaleString();
      },
    },
  };
</script>

<style lang="less" scoped>
  // .home {
  //   margin: 10px;
  // }

  .header {
    display: flex;
    // padding-right: 30px;

    .item {
      flex: 1;
      height: 100px;
      padding: 10px;
      background: #fff;
      border-radius: 10px;
      margin-left: 20px;
      margin-right: 20px;
      font-weight: bold;
      color: #fff;
      // text-align: center;
      position: relative;

      .num {
        font-size: 22px;
        margin: 10px;
        color: #fff;
      }

      .bottom {
        position: absolute;
        border-top: 1px solid rgb(246, 245, 245);
        padding: 10px 20px;
        bottom: 0;
        right: 0;
        left: 0;
        color: #fff;
        font-weight: normal;
      }
    }

    .item:nth-child(1) {
      background-image: linear-gradient(#df887d, #88554d);
    }

    .item:nth-child(2) {
      background-image: linear-gradient(#409eff, #2e556e);
    }

    .item:nth-child(3) {
      background-image: linear-gradient(#b54fa8, #713c7a);
    }

    .item:nth-child(4) {
      background-image: linear-gradient(#1cd2f1, #39717a);
    }
  }

  // 图表

  .content {
    margin: 20px;
    display: flex;
    height: 320px;

    .time-info {
      flex: 2;
      background: #fff;
      margin-right: 20px;
      padding: 10px;
    }

    .area {
      flex: 1;
      background: #fff;
      padding: 10px;
    }
  }

  //内容

  .home-footer {
    display: flex;
    padding-left: 20px;
    margin-bottom: 20px;

    .box-card {
      flex: 1;
      margin-right: 30px;

      span {
        font-weight: 600;
      }
    }
    .item {
      text-align: center;
      font-size: 20px;
      color: #333;
      .el-col {
        border-right: 1px solid #eee;
      }
      .el-col:last-child {
        border-right: none;
      }
      .title {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
  }
</style>
