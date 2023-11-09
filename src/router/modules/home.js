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
    path: "/analytics",
    name: "analytics",
    component: IndexViewVue,
    meta: {
      layout: "AppDashboardLayout",
      parent: "analytics",
      name: "home",
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
