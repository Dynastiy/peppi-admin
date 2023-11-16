import IndexViewVue from "@/modules/Inventory/IndexPage.vue";

// Products
import Products from "@/modules/Inventory/Products/IndexPage.vue";
import AddProduct from "@/modules/Inventory/Products/AddProduct.vue";
import ProductID from "@/modules/Inventory/Products/uuid/_uuid.vue"
import EditProduct from "@/modules/Inventory/Products/uuid/EditProduct.vue"


import Categories from "@/modules/Inventory/Categories/IndexPage.vue";

// Users 
import Users from "@/modules/Inventory/Users/IndexPage.vue";
import UserDetails from "@/modules/Inventory/Users/uuid/_uuid.vue"

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
      requiresAuth: true
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
          requiresAuth: true
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
          requiresAuth: true
        },
      },

      {
        path: "/product/:id",
        name: "product-details",
        component: ProductID,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Product Details",
          header: "Product Details",
          subParent: "products",
          subName: "products",
          requiresAuth: true
        },
      },

      {
        path: "/product/:id/edit",
        name: "edit-product",
        component: EditProduct,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Edit Product",
          header: "Edit Product",
          subParent: "products",
          subName: "products",
          requiresAuth: true
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
          requiresAuth: true
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
          requiresAuth: true
        },
      },

      {
        path: "/users/:id",
        name: "view-user",
        component: UserDetails,
        meta: {
          layout: "AppDashboardLayout",
          parent: "inventory",
          name: "Users",
          header: "Users",
          subParent: "users",
          subName: "users",
          requiresAuth: true
        },
      },
    ],
  },
];

export default router;
