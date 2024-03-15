import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";

// w 异步加载组件
// s 商品管理
const Product = () => import("@/views/product/Index.vue");
const ProductList = () => import("@/views/product/list/Index.vue");
const ProductCategory = () => import("@/views/product/category/Index.vue");
const ProductPage = () => import("@/views/product/list/ProductPage.vue");
// s 订单管理
const Order = () => import("@/views/order/Index.vue");
const OrderList = () => import("@/views/order/list/Index.vue");
const OrderCollection = () => import("@/views/order/collection/Index.vue");
const OrderAudit = () => import("@/views/order/audit/Index.vue");
// s 广告分类
const Advert = () => import("@/views/advert/Index.vue");
const AdverList = () => import("@/views/advert/list/Index.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      // w 产品管理 路由配置
      {
        path: "/product",
        name: "product",
        component: Product,
        redirect: "/product/list", // w 重定向 访问 /product 时重定向到 /product/list
        children: [
          {
            path: "list", //访问路径：/product/list
            name: "product-list",
            component: ProductList,
          },
          {
            path: "category", //访问路径：/product/category
            name: "product-category",
            component: ProductCategory,
          },
          {
            path: "product-page",
            name: "productPage",
            component: ProductPage,
            meta: {
              // w 配置一个左侧菜单导航高亮的标识
              activeMenu: "/product/list",
            },
          },
        ],
      },
      // w 订单管理 路由配置
      {
        path: "/order",
        name: "order",
        component: Order,
        children: [
          {
            path: "list", //访问路径：/order/list
            name: "order-list",
            component: OrderList,
          },
          {
            path: "collection", //访问路径：/order/collection
            name: "order-collection",
            component: OrderCollection,
          },
          {
            path: "audit", //访问路径：/order/audit
            name: "order-audit",
            component: OrderAudit,
          },
        ],
      },
      // w 广告分类 路由配置
      {
        path: "/advert",
        name: "advert",
        component: Advert,
        children: [
          {
            path: "list", //访问路径：/advert/list
            name: "advert-list",
            component: AdverList,
          },
        ],
      },
    ],
  },
  // w 登录页 路由配置
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
