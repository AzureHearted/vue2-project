<template>
  <div class="container">
    <!-- w 顶部区域 -->
    <div class="header">
      <!-- w 侧边菜单 控制按钮-->
      <div class="open">
        <span
          class="iconfont icon-right-indent"
          @click="changMenu"
          v-if="!isCollapse"
        ></span>
        <span
          class="iconfont icon-left-indent"
          @click="changMenu"
          v-else
        ></span>
      </div>
      <!-- w 顶部右上角功能区-->
      <div class="right">
        <!-- w 时间-->
        <span>{{ time }}</span>
        |
        <!-- w 下拉菜单 -->
        <el-dropdown>
          <span
            class="el-dropdown-link"
            :style="{color: 'white'}"
          >
            语言环境<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>中文</el-dropdown-item>
            <el-dropdown-item>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        |
        <!-- w 欢迎语 -->
        <span>欢迎 admin</span>
        |
        <!-- w 关闭按钮 -->
        <span class="el-icon-switch-button icon"></span>
      </div>
    </div>
    <!-- w 内容区域 -->
    <div class="wrapper">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
  export default {
    props: {
      isCollapse: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        time: "",
      };
    },
    created() {
      //w 每秒进行一次时间更新(首次立即执行)
      this.reNewTime();
      setInterval(() => {
        this.reNewTime();
      }, 1000);
    },
    methods: {
      changMenu() {
        this.$emit("changShow");
      },
      //f 更新时间
      reNewTime() {
        this.time = this.$moment().format("YYYY年MM月DD日 HH:mm:ss");
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    .header {
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 50px;
      background: #1e78bf;
      color: #fff;
      line-height: 50px;
      .open {
        .iconfont {
          font-size: 22px;
          cursor: pointer;
        }
      }
      .right {
        // position: relative;
        width: 380px;
        font-size: 12px;
        span {
          padding: 0 4px;
        }
        .icon {
          font-size: 16px;
        }
      }
    }
    //内容区容器
    .wrapper {
      flex: 1;
      margin: 10px;
      overflow-y: auto;
    }
  }
</style>
