import IndexViewVue from "@/modules/Home/IndexPage.vue";
import Orders from "@/modules/Orders/IndexPage.vue";
import Reviews from "@/modules/ReviewsAndRatings.vue";
import UserProfile from "@/modules/UserProfile.vue";

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
];

export default router;
