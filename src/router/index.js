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
const OrderContract = () => import("@/views/order/contract/Index.vue");
// s 广告分类
const Advert = () => import("@/views/advert/Index.vue");
const AdverList = () => import("@/views/advert/list/Index.vue");
// s 系统管理
const SysManage = () => import("@/views/sysManage/Index.vue");
const RoleManage = () => import("@/views/sysManage/roleManage/Index.vue");
const DepartmentManage = () =>
  import("@/views/sysManage/departmentManage/Index.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    meta: {
      breadcrumbTitle: "首页",
      requireLogin: true, // 用于判断是否需要
    },
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          breadcrumbTitle: "首页",
        },
      },
      // w 产品管理 路由配置
      {
        path: "/product",
        name: "product",
        component: Product,
        redirect: "/product/list", // w 重定向 访问 /product 时重定向到 /product/list
        meta: {
          breadcrumbTitle: "产品管理",
        },
        children: [
          {
            path: "list", //访问路径：/product/list
            name: "product-list",
            component: ProductList,
            meta: {
              breadcrumbTitle: "产品列表",
            },
          },
          {
            path: "category", //访问路径：/product/category
            name: "product-category",
            component: ProductCategory,
            meta: {
              breadcrumbTitle: "产品分类",
            },
          },
          {
            path: "product-page",
            name: "productPage",
            component: ProductPage,
            meta: {
              // w 配置一个左侧菜单导航高亮的标识
              activeMenu: "/product/list",
              breadcrumbTitle: "商品详情",
            },
          },
        ],
      },
      // w 订单管理 路由配置
      {
        path: "/order",
        name: "order",
        component: Order,
        redirect: "/order/list",
        meta: {
          breadcrumbTitle: "订单管理",
        },
        children: [
          {
            path: "list", //访问路径：/order/list
            name: "order-list",
            component: OrderList,
            meta: {
              breadcrumbTitle: "订单列表",
            },
          },
          {
            path: "collection", //访问路径：/order/collection
            name: "order-collection",
            component: OrderCollection,
            meta: {
              breadcrumbTitle: "汇总清单",
            },
          },
          {
            path: "contract", //访问路径：/order/contract
            name: "order-contract",
            component: OrderContract,
            meta: {
              breadcrumbTitle: "订单审核",
            },
          },
        ],
      },
      // w 广告分类 路由配置
      {
        path: "/advert",
        name: "advert",
        component: Advert,
        redirect: "/advert/list",
        meta: {
          breadcrumbTitle: "广告分类",
        },
        children: [
          {
            path: "list", //访问路径：/advert/list
            name: "advert-list",
            component: AdverList,
            meta: {
              breadcrumbTitle: "广告列表",
            },
          },
        ],
      },
      // w 系统管理
      {
        path: "/system",
        name: "system",
        component: SysManage,
        redirect: "/system/role",
        meta: {
          breadcrumbTitle: "系统管理",
        },
        children: [
          {
            path: "role",
            name: "system-role",
            component: RoleManage,
            meta: {
              breadcrumbTitle: "角色管理",
            },
          },
          {
            path: "department",
            name: "system-department",
            component: DepartmentManage,
            meta: {
              breadcrumbTitle: "部门管理",
            },
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
  // mode: "history",
  // mode: "hash",
  mode: process.env.VUE_APP_ENV === "product" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

/** 配置路由的全局前置守卫
 * @summary 配置说明：https://router.vuejs.org/zh/guide/advanced/navigation-guards
 */
import store from "@/store";
router.beforeEach(async (to, from, next) => {
  // console.log("路由守卫————", to, from);
  // console.log("路由匹配信息", to.matched);
  // 如果当前页面和目标页相同则不跳转
  // if (from.name === to.name) next();
  // 判断是否需要登录
  if (to.matched.some((r) => r.meta.requireLogin)) {
    // s 需要登录
    let {token} = store.state.account.userinfo;
    // 从仓库中获取用户信息(判断是否登录)
    if (token) {
      // 如果有token则跳转
      next();
    } else {
      // 将用户重定向到登录页面
      next("/login");
    }
  } else {
    // s 不需要登录
    next();
  }
});

export default router;
