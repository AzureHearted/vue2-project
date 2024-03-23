import Vue from "vue";
import VueI18n from "vue-i18n"; // s 引入vue-i18n

// 自定义语言包
import zh_CN from "./zh-CN";
import en_US from "./en-US";

// element-ui的语言包
// import Element from "element-ui"; // s 引入element
import ElementLocale from "element-ui/lib/locale"; // * 兼容性写法
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "element-ui/lib/locale/lang/en";

Vue.use(VueI18n);

// 准备翻译的语言环境信息
const messages = {
  "zh-CN": {
    ...zh_CN,
    ...zhLocale, // element-ui的中文语言包
  }, // 中文配置
  "en-US": {
    ...en_US,
    ...enLocale, // element-ui的英文语言包
  }, // 英文配置
};

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: "zh-CN", // 设置地区
  messages, // 设置地区信息
});

// 对element-ui国际化对vue-i18n的兼容处理
// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value),
// });

// * 兼容性写法
ElementLocale.i18n((key, value) => i18n.t(key, value));

// 导出i18n,在main.js中挂到vue实例中
export default i18n;
