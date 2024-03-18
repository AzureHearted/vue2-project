/**
 * 存储当前行的商品信息数据
 */
export default {
  namespaced: true,
  state: {
    mode: "add", // w 模式标识符
    rowData: {}, // w 当前行初始的数据容器
  },
  mutations: {
    // f 设置rowData
    setRowData(state, payload) {
      // w 不能直接赋值对象
      // state.rowData = {...payload}; // w 浅拷贝 ES6对象展开语法
      state.rowData = JSON.parse(JSON.stringify(payload)); // w 深拷贝 JSON方法
      // console.log("vuex获取到数据————", state.rowData);
    },
    // f 更改标题
    changeMode(state, payload) {
      state.mode = payload;
    },
  },
  // s 类似vue中的计算属性
  getters: {
    title(state) {
      if (state.mode === "add") {
        return "添加商品";
      } else if (state.mode === "edit") {
        return "编辑商品";
      } else {
        return "商品信息";
      }
    },
  },
};
