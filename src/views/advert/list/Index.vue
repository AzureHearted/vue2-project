<template>
  <div class="container">
    <div class="wrapper">
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <div class="tree">
            <el-tree
              ref="tree"
              :props="defaultProps"
              node-key="id"
              empty-text="暂无数据"
              :highlight-current="true"
              :default-expanded-keys="[1]"
              :indent="4"
              :expand-on-click-node="false"
              lazy
              :load="load"
              @node-click="handleNodeClick">
              <span class="custom-tree-node" slot-scope="{node, data}">
                <span>{{ node.label }}</span>
                <span class="button-group">
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => handleAppend(node, data)">
                    增加
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => handleEdit(node, data)">
                    编辑
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click.stop="() => handleRemove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18" :offset="0">
          <div class="main">
            <div class="button-group">
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                @click="dialogAdvertAdd.visible = true">
                新增广告
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="handleAdvertBatchRemove">
                批量删除
              </el-button>
            </div>
            <el-table
              :data="tableData"
              border
              stripe
              row-key="id"
              @selection-change="selectionChange">
              <el-table-column type="selection" width="50px" align="center">
              </el-table-column>
              <el-table-column prop="pid" label="PID" min-width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="url"
                label="访问地址"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="image"
                label="图片地址"
                min-width="80"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <span slot-scope="{row}">
                  <PopoverDeleteButton
                    tips="删除后无法恢复,确定删除吗？"
                    @confirm-click="handleAdvertRemove(row)">
                  </PopoverDeleteButton>
                </span>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        :title="dialogAdvertAdd.title"
        :visible.sync="dialogAdvertAdd.visible"
        width="600px"
        @close="dialogAdvertAdd.handleClose()">
        <span>
          <el-form
            ref="form"
            :model="dialogAdvertAdd.form"
            :rules="dialogAdvertAdd.rules"
            label-width="80px"
            :inline="false"
            @keyup.enter.native="handleAdvertAdd(dialogAdvertAdd.form)"
            size="normal">
            <el-form-item label="所属类别">
              <el-input :value="nowCategory.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="广告名称" prop="name">
              <el-input v-model="dialogAdvertAdd.form.name"></el-input>
            </el-form-item>
            <el-form-item label="访问地址" prop="url">
              <el-input v-model="dialogAdvertAdd.form.url"></el-input>
            </el-form-item>
            <el-form-item label="图片地址" prop="image">
              <el-input v-model="dialogAdvertAdd.form.image"></el-input>
            </el-form-item>
            <el-form-item style="text-align: end">
              <el-button @click="dialogAdvertAdd.visible = false">
                取消
              </el-button>
              <el-button
                type="primary"
                @click="handleAdvertAdd(dialogAdvertAdd.form)">
                确认
              </el-button>
            </el-form-item>
          </el-form>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import PopoverDeleteButton from "@/components/popover-delete-button/PopoverDeleteButton";
  /** 数据结构定义
   * @typedef {object} treeData tree数据对象
   * @property {number} id id
   * @property {string} name 名称
   * @property {number} cid 分类id
   * @property {number} type 类型标号
   *
   * @typedef {object} tableData 表格数据对象
   * @property {number=} id
   * @property {string} name
   * @property {number} pid
   * @property {string} url
   * @property {string} image
   */
  // let id = 10000;

  export default {
    components: { PopoverDeleteButton},
    watch: {
      "nowCategory.pid"(val, oldVal) {
        this.getAdvertInfo();
      },
    },
    methods: {
      /** 懒加载节点
       * @param {*} node 节点
       * @param {Function} resolve 回调函数(用于返回请求获得的数据)
       */
      async load(node, resolve) {
        // console.log("节点懒加载", node);
        let type = node?.data?.cid;
        // let data = node.data
        let res = await this.$api.selectContentCategoryByType({
          type: type,
        });
        if (res.data.status === 200) {
          let {result} = res.data;
          // 从1级节点开始需要特殊处理
          if (node.level > 0) {
            let data = node.data;
            this.$set(data, "children", []);
            data.children.push(...result);
            this.nowCategory.pid = data.cid;
            this.nowCategory.name = data.name;
          }
          // console.log("懒加载结果", result);
          return resolve(result);
        } else {
          return resolve([]);
        }
      },
      /** 节点点击回调
       * @param {treeData} data 原始数据
       * @param {*} vNode 节点对象
       * @param {*} tree Tree对象
       */
      handleNodeClick(data, vNode, tree) {
        // console.log("点击了节点", rawData, vNode);
        this.nowCategory.pid = data.cid;
        this.nowCategory.name = data.name;
        this.getAdvertInfo();
      },
      /** 添加节点
       * @param {*} node 节点对象
       * @param {treeData} data 原始数据对象
       */
      handleAppend(node, data) {
        console.log("添加节点", data, node);
        this.$prompt("请输入类目名称：", {
          title: "新增类目",
          inputPlaceholder: "请输入内容",
          inputType: "string",
        })
          .then(async ({value: name}) => {
            let res = await this.$api.insertContentCategory({
              cid: data.cid,
              name: name,
            });
            console.log("添加情况", res.data);
            if (res.data.status === 200) {
              let {id, cid} = res.data;
              // w 更新数据
              /** @type{treeData} */
              const newChild = {id: id, name: name, type: data.cid, cid: cid};
              if (!data.children) {
                this.$set(data, "children", []);
              }
              console.log("新节点", newChild);
              data.children.push(newChild);
              //  成功提示
              this.$message({
                type: "success",
                message: `成功添加类目"${name}"`,
              });
            } else {
              this.$message({
                type: "error",
                message: "添加出错！",
              });
            }
          })
          .catch(() => {});
      },
      /** 删除节点
       * @param {*} node 节点对象
       * @param {treeData} data 原始数据对象
       */
      handleRemove(node, data) {
        console.log("删除节点", node, data);
        this.$confirm(
          `确认删除广告分类“${data.name} (id:${data.id})”？该操作无法恢复`,
          "提示"
        )
          .then(async () => {
            // 调用api删除数据
            let res = await this.$api.deleteAdvertCategoryById({
              id: data.id,
              cid: data.cid,
            });
            if (res.data.status === 200) {
              // 删除组件中的节点
              this.removeTreeNode(node, data);
              // 消息提示
              this.$message({
                type: "success",
                message: `广告分类“${data.name} (id:${data.id})”删除成功!`,
              });
            }
          })
          .catch(() => {});
      },
      /** 修改
       * @param {*} node 节点对象
       * @param {treeData} data 原始数据对象
       */
      handleEdit(node, data) {
        this.$prompt(`修改广告分类“${data.name}”的名称为……`, {
          title: "修改广告分类信息",
          inputPlaceholder: "请输入内容",
          inputType: "string",
          inputValue: data.name,
        })
          .then(async ({value: name}) => {
            // 调用api修改信息名称
            let res = await this.$api.updateContentCategory({
              id: data.id,
              name: name,
            });
            if (res.data.status === 200) {
              // 从tree组件中移除
              data.name = name;
              // 消息提示
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "修改出错!",
              });
            }
            // console.log("新名称:", name);
          })
          .catch(() => {});
      },
      /** 移除tree节点和原始信息
       * @param {*} node 节点对象
       * @param {treeData} data 原始数据对象
       */
      async removeTreeNode(node, data) {
        let parentNode = node.parent;
        let childNodes = parentNode.childNodes; // 父节点的 childNodes
        let children = parentNode.data.children; // 父节点的 data.children (原始数据)
        const index = childNodes.findIndex(({data: d}) => d.id === data.id);
        // 原始对象中的信息和节点对象中的信息都需要删除
        childNodes.splice(index, 1);
        children.splice(index, 1);
      },
      /** 获取广告信息
       * @param {number} pid 广告类型id
       */
      async getAdvertInfo() {
        let pid = this.nowCategory.pid;
        if (!pid) return;
        let res = await this.$api.selectTbContentAllByCategoryId({pid});
        if (res.data.status === 200) {
          // console.log("广告信息获取结果", res.data);
          this.tableData = res.data.result;
        } else {
          this.tableData = [];
        }
      },
      /** 添加广告
       * @param {tableData} data
       */
      async handleAdvertAdd(data) {
        console.log("添加广告", data);
        this.dialogAdvertAdd.visible = false;

        // w 等待表单进行验证
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            console.log("表单验证成功", data);
            // 验证无误则进行表单提交
            let res = await this.$api.insertTbContent({
              pid: this.nowCategory.pid,
              name: data.name,
              url: data.url,
              image: data.image,
            });
            if (res.data.status === 200) {
              this.getAdvertInfo();
            } else {
              this.$message({
                type: "error",
                message: "上传出错!",
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "提交有误! 请检查表单信息",
            });
          }
        });
      },
      /** 删除广告
       * @param {tableData} row 表格行对象
       */
      async handleAdvertRemove(row) {
        console.log("删除广告", row.id, row.name);
        let res = await this.$api.deleteContentByIds({id: row.id});
        if (res.data.status === 200) {
          // console.log("删除结果", res.data);
          // 删除成功后刷新数据
          this.getAdvertInfo();
        }
      },
      /** 表格选项发生变化的回调
       * @param {tableData[]} selection
       */
      selectionChange(selection) {
        console.log("选项变化:", selection);
        this.selectionIds = selection.map((s) => s.id);
      },
      /** 批量删除广告 */
      handleAdvertBatchRemove() {
        let ids = this.selectionIds;
        if (ids.length > 0) {
          this.$confirm(
            `确认删除已选中的${ids.length}条广告? 此操作无法撤销`,
            "提示"
          )
            .then(async () => {
              let res = await this.$api.batchDeleteContentByIds({ids});
              if (res.data.status === 200) {
                // 刷新数据
                this.getAdvertInfo();
                // 消息提示
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除出错",
                });
              }
            })
            .catch(() => {});
        } else {
          this.$message({
            type: "info",
            message: "请勾选选择要删除的广告",
          });
        }
      },
    },
    data() {
      return {
        defaultProps: {
          id: "id",
          label: "name",
          cid: "cid",
          type: "type",
          children: "children",
        },
        nowCategory: {
          pid: null,
          name: "",
        },
        treeData: [],
        tableData: [],
        selectionIds: [], // 选中的广告id
        dialogAdvertAdd: {
          title: "添加广告",
          visible: false,
          form: {
            name: "",
            url: "",
            image: "",
          },
          rules: {
            name: [
              {
                required: true,
                message: "广告名称不能为空",
                trigger: "blur",
              },
            ],
            url: [
              {
                required: true,
                message: "广告访问链接不能为空不能为空",
                trigger: "blur",
              },
            ],
            image: [
              {
                required: true,
                message: "广告图片链接不能为空",
                trigger: "blur",
              },
            ],
          },
          handleClose() {
            this.visible = false;
            this.form = {
              name: "",
              url: "",
              image: "",
            };
          },
        },
      };
    },
  };
</script>

<style lang="less" scoped>
  .container {
    height: fit-content;
    .wrapper {
      .tree {
        // background: red;
        .el-tree {
          // background: transparent;

          .custom-tree-node {
            .button-group {
              padding: 4px;
              .el-button {
                // background: greenyellow;
                margin: 2px;
                padding: 3px 2px;
              }
            }
          }
        }
      }
      .main {
        // background: wheat;
        // height: 800px;
        .button-group {
          background: white;
          // text-align: center;
          margin-bottom: 5px;
          padding: 10px;
          border: 1px solid #ebeef5;
        }
      }
    }
  }
</style>
