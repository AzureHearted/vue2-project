<template>
  <div class="container">
    <div class="title">产品类目管理</div>
    <div class="tree">
      <div class="button-group">
        <el-button
          type="warning"
          size="small"
          @click="addFirstCategory"
        >
          新增一级类目
        </el-button>
      </div>
      <!-- tree组件 -->
      <el-tree
        ref="tree"
        :data="treeData"
        node-key=""
        :props="defaultProps"
        show-checkbox
        :default-expand-all="true"
        :expand-on-click-node="true"
        :render-content="renderContent"
      ></el-tree>
    </div>
  </div>
</template>

<script>
  /** 数据类型定义
   * @typedef {{cid:num,id:num,name:string,type:num,children?:DataItem[]}} DataItem tree成员
   */

  export default {
    data() {
      return {
        /** tree数据类型定义 */
        defaultProps: {
          label: "name",
        },
        /** tree数据
         * @type {Array<DataItem>}
         */
        treeData: [],
      };
    },
    created() {
      this.handleGetIfno();
    },
    methods: {
      /** 获取数据 */
      async handleGetIfno() {
        let res = await this.$api.itemCategory();
        // console.log(res.data);
        this.treeData = this.processingData(res.data.result);
      },
      /** 数据处理
       * @param {Array<DataItem>} rawData 未处理的结果数组
       */
      processingData(rawData) {
        /** 处理后的数据
         *  @type {DataItem[]}
         */
        let data = [];
        // 获取一级类别
        data = rawData.filter((x) => x.type === 1);
        // 获取二级类别
        data.forEach((first) => {
          first.children = rawData.filter((x) => x.type === first.cid);
        });
        return data;
      },
      /** 节点渲染函数
       * @param {Function} h 渲染函数
       * @param {Object} param1
       * @param {Object} param1.node 节点对象
       * @param {Object} param1.data 数据对象
       * @param {Objcet} param1.store store
       */
      renderContent(h, {node, data, store}) {
        return (
          <span class="custom-tree-node">
            <span class="name">{node.label}</span>
            <span>
              {node.level === 1 ? (
                <el-button
                  class="mini"
                  icon="el-icon-plus"
                  on-click={() => this.append(data)}
                >
                  新增
                </el-button>
              ) : null}
              <el-button
                class="mini"
                icon="el-icon-edit"
                on-click={() => this.update(node, data)}
              >
                修改
              </el-button>
              <el-button
                class="mini"
                type="danger"
                icon="el-icon-delete"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      },
      /** 新增一级类目 */
      addFirstCategory() {
        // console.log("新增一级类目");
        this.$prompt("请输入类目名称：", {
          title: "新增一级类目",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入内容",
          inputType: "string",
        })
          .then(async ({value}) => {
            // console.log("新类目名称:", value);
            let res = await this.$api.insertCategory({name: value});
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: `成功添加一级类目"${value}"`,
              });
              // w 更新数据
              this.handleGetIfno();
            } else {
              this.$message({
                type: "error",
                message: "添加出错！",
              });
            }
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "取消输入",
            // });
          });
      },
      /** 添加子节点
       * @param {Object} data 节点数据对象
       */
      append(data) {
        // console.log("添加子节点", data);
        this.$prompt("请输入类目名称：", {
          title: `为类目"${data.name}"新增子类目`,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入内容",
          inputType: "string",
        })
          .then(async ({value}) => {
            // console.log("新类目名称:", value);
            let res = await this.$api.insertItemCategory({cid: data.cid, name: value});
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: `成功为类目"${data.name}"添加子类目"${value}"`,
              });
              // w 更新数据
              this.handleGetIfno();
            } else {
              this.$message({
                type: "error",
                message: "添加出错！",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      },
      /** 节点删除函数
       * @param {Object} data 节点数据对象
       * @param {Object} node 节点对象
       */
      remove(node, data) {
        // console.log("删除节点", node, data);
        this.$confirm(`是否删除此类目(类目名称:${node.label},id:${data.id})`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await this.$api.deleteContentCategoryById({id: data.id});
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: `成功删除类目"${node.label}"`,
              });
              // w 更新数据
              this.handleGetIfno();
            } else {
              this.$message({
                type: "error",
                message: `删除类目"${node.label}"出错`,
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      /** 节点修改函数
       * @param {Object} data 节点数据对象
       * @param {Object} node 节点对象
       */
      update(node, data) {
        // console.log("修改节点", node, data);
        this.$prompt("请输入新类目名称：", {
          title: `修改类目"${data.name}"的名称`,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入内容",
          inputType: "string",
          inputValue: data.name,
        })
          .then(async ({value}) => {
            if (data.name === value) {
              this.$message({
                type: "info",
                message: "类目名称相同",
              });
              return;
            }
            // console.log("新类目名称:", value);
            let res = await this.$api.updateCategory({id: data.id, name: value});
            // console.log(res.data);
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: `将类目"${data.name}"更名为"${value}"`,
              });
              // w 更新数据
              this.handleGetIfno();
            } else {
              this.$message({
                type: "error",
                message: "类目修改出错！",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
            });
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .container {
    background: #fff;
    // background: green;
    height: fit-content;
    // overflow: hidden;
    .title {
      background: #eee;
      padding: 14px;
      color: #333;
      font-weight: bold;
    }
    .button-group {
      border: 1px solid #eee;
      padding: 8px;
    }
    .tree {
      padding: 10px;
      display: flex;
      flex-flow: column;
      gap: 10px;
      // overflow-y: scroll;
      /deep/.el-tree-node__content {
        padding: 5px 0;
        .custom-tree-node {
          // w 名称的样式
          .name {
            width: 300px;
            display: inline-block;
          }
          // w el按钮样式修改
          .mini {
            padding: 4px 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>