//z 分页组件二次封装
<template>
  <div>
    <!-- 
      el-paination 分页组件
        s 属性
        - small         是否使用小型分页样式 boolean
        - background    是否为分页按钮添加背景色 boolean
        - page-size     每页显示条目个数，支持 .sync 修饰符 number
        - page-sizes    每页显示个数选择器的选项设置	number[]	
        - total	        总条目数  number
        - current-page  当前页数，支持 .sync 修饰符	number
        - layout	组件布局(用于调整顺序)，子组件名用逗号分隔	String 
          -> sizes, prev, pager, next, jumper, ->, total, slot
        f 事件
        - size-change	      pageSize 改变时会触发             回调参数：每页条数
        - current-change    currentPage 改变时会触发          回调参数：当前页
        - prev-click	      用户点击上一页按钮改变当前页后触发	回调参数：当前页
        - next-click	      用户点击下一页按钮改变当前页后触发	回调参数：当前页
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      currentPage: {
        //s 当前页码
        type: Number,
        default: 1,
      },
      total: {
        //s 条目总数
        type: Number,
        default: 0,
      },
      pageSize: {
        //s 每页显示条数
        type: Number,
        default: 10,
      },
      pageSizes: {
        //s 每页显示个数选择器
        type: Array,
        default() {
          return [10, 20, 30, 40, 50];
        },
      },
      layout: {
        //s 组件布局(用于调整顺序)
        type: String,
        default: "total, prev, pager, next, jumper",
      },
    },
    data() {
      return {
        // pageSizes: [10, 20, 30, 40, 50],
      };
    },
    methods: {
      //f (回调)切换每页数量
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      //f (回调)当前页码改变
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.$emit("CurrentChange", val);
      },
    },
  };
</script>

<style lang="less" scoped></style>
