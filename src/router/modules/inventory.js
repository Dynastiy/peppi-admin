import IndexViewVue from "@/modules/Inventory/IndexPage.vue";

// Products
import Products from "@/modules/Inventory/Products/IndexPage.vue";
import AddProduct from "@/modules/Inventory/Products/AddProduct.vue";


import Categories from "@/modules/Inventory/Categories/IndexPage.vue";

// Users 
import Users from "@/modules/Inventory/Users/IndexPage.vue";

const router = [
  {
    path: "/inventory",
    redirect: "/inventory/products",
    name: "inventory",
    component: IndexViewVue,
    meta: {
      layout: "AppDashboardLayout",
      parent: "inventory",
      name: "inventory",
      header: "inventory",
    },

    children: [
      {
        path: "/inventory/products",
        name: "products",
        component: Products,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "products",
          header: "my account",
          subName: "products",
        },
      },

      {
        path: "product/add-product",
        name: "add-product",
        component: AddProduct,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Add product",
          header: "my account",
          subParent: "products",
          subName: "products",
        },
      },

      {
        path: "categories",
        name: "categories",
        component: Categories,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Categories",
          header: "my account",
          subName: "categories",
        },
      },

      {
        path: "users",
        name: "users",
        component: Users,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Users",
          header: "my account",
          subName: "users",
        },
      },
    ],
  },
];

export default router;
