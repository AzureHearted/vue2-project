<template>
  <!-- 
    el-tree 树状结构
        show-checkbox  节点是否可被选择	boolean	—	false  
        props	配置选项，具体看下表	object
            label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
            children	指定子树为节点对象的某个属性值	string	—	—
            disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)	—	—
            isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)
        load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
        lazy	是否懒加载子节点，需与 load 方法结合使用	boolean	—	false
  -->
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
    accordion
    lazy
    :load="load"
  ></el-tree>
</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          label: "name",
          children: "children",
        },
        data: [],
      };
    },
    created() {},
    methods: {
      // async getItemCategory() {
      //   let res = await this.$api.itemCategory();
      //   if (res.status === 200) {
      //     // console.log("原始数据", res.data.result);
      //     // console.log("处理后的数据", this.processingRowCategoryInfo(res.data.result));
      //     this.categoryData = this.processingRowCategoryInfo(res.data.result);
      //   }
      // },
      //f 懒加载节点
      load(node, resolve) {
        console.log('节点懒加载',node, resolve);
      },
      handleNodeClick(rawData, vNode, tree) {
        // console.log("点击了节点", "原始数据:", rawData, "节点对象:", vNode, "Tree对象:", tree);
        // this.form.category = rawData.name;
        // this.form.cid = rawData.cid;
        this.$emit("nodeClick", rawData.name, rawData.cid);
      },
    },
  };
</script>

<style></style>
