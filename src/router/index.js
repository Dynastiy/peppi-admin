import Vue from "vue";
import VueRouter from "vue-router";

// import store from "@/store";

// Routes
import Auth from "./modules/auth";
import Inventory from "./modules/inventory";
import Analytics from "./modules/home";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(Auth, Inventory, Analytics),
});

router.beforeEach((to, from, next) => {
  var isLoggedIn = localStorage.getItem("token");
  // let user = store.getters["auth/getUser"];
  // console.log(user, "kkk");
  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!isLoggedIn) {
      // Redirect to the login page
      next({ path: "/sign-in", query: { redirectFrom: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
