import IndexViewVue from "@/modules/Home/IndexPage.vue";

import Orders from "@/modules/Orders/IndexPage.vue";
import OrderDetails from "@/modules/Orders/uuid/_uuid.vue";

import Payments from "@/modules/Payments/IndexPage.vue";
import PaymentDetails from "@/modules/Payments/uuid/_uuid.vue";

import Reviews from "@/modules/ReviewsAndRatings.vue";
import UserProfile from "@/modules/UserProfile.vue";

import ShippingDetails from "@/modules/Configuration/ShippingID.vue";

import Configuration from "@/modules/Configuration/IndexPage.vue";


const router = [
  {
    path: "/",
    name: "analytics",
    component: IndexViewVue,
    meta: {
      layout: "AppDashboardLayout",
      parent: "analytics",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/orders",
    name: "order",
    component: Orders,
    meta: {
      layout: "AppDashboardLayout",
      parent: "orders",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/order/:id",
    name: "order-details",
    component: OrderDetails,
    meta: {
      layout: "AppDashboardLayout",
      parent: "orders",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/payments",
    name: "payments",
    component: Payments,
    meta: {
      layout: "AppDashboardLayout",
      parent: "payments",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/payment/:id",
    name: "payment-details",
    component: PaymentDetails,
    meta: {
      layout: "AppDashboardLayout",
      parent: "payments",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/reviews-and-ratings",
    name: "reviews-and-ratings",
    component: Reviews,
    meta: {
      layout: "AppDashboardLayout",
      parent: "reviews-and-ratings",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
    meta: {
      layout: "AppDashboardLayout",
      parent: "profile",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/configuration",
    name: "configuration",
    component: Configuration,
    meta: {
      layout: "AppDashboardLayout",
      parent: "configuration",
      name: "home",
      requiresAuth: true
    },
  },

  {
    path: "/configuration/shipping/:id",
    name: "shipping-details",
    component: ShippingDetails,
    meta: {
      layout: "AppDashboardLayout",
      parent: "configuration",
      name: "shipping",
    },
  },
];

export default router;
