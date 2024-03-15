<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc; z-index: -1"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>
<script>
  import "@wangeditor/editor/dist/css/style.css";
  import {Editor, Toolbar, DomEditor} from "@wangeditor/editor-for-vue";

  export default {
    components: {Editor, Toolbar},
    props: {
      inputHtml: {
        type: String,
        default() {
          return "<p>Hello</p>";
        },
      },
    },
    data() {
      return {
        editor: null,
        html: this.inputHtml,
        toolbarConfig: {
          toolbarKeys: [
            "headerSelect",
            "bold",
            "underline",
            "italic",
            "color",
            "bgColor",
            "fontSize",
            "fontFamily",
            "lineHeight",
            "bulletedList",
            "numberedList",
            "todo",
            "|",
            "emotion",
            // "uploadImage",
            "insertLink",
            "insertTable",
            "codeBlock",
            "divider",
          ],
        },
        editorConfig: {
          placeholder: "请输入内容...",
        },
        mode: "default", // or 'simple'
      };
    },
    methods: {
      onCreated(editor) {
        this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
        /**
         *s 说明：
        Object.seal() 是JavaScript中的一个方法，它的主要作用是密封一个对象。这意味着，一旦一个对象被密封，它将变得不可扩展，即不能添加新的属性，同时对象的所有自有属性都将变得不可配置。这意味着你不能再删除这些属性，也不能将它们的特性（如可枚举性、可写性）从数据属性转变为访问器属性，或者反之。但是，已经存在的属性如果它们是可写的，那么它们的值仍然可以被修改。
         */
        // console.log(this.toolbarConfig);
      },
      // f 内容变化
      onChange(editor) {
        // console.log("内容变化————", this.html, editor);
        this.$emit("change", this.html);
      },
    },
    mounted() {
      // 模拟 ajax 请求，异步渲染编辑器
      // setTimeout(() => {
      //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
      // }, 1500);
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },

    watch: {
      // s 监听html变量变化，并通过emit返回父组件
      // html: {
      //   handler(val, oldVal) {
      //     console.log("内容变化");
      //     this.$emit("change", this.html);
      //   },
      // },
    },
  };
</script>

<style lang="less" scoped></style>
