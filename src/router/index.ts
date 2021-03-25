import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/connect",
    name: "Connect Wallet",
    component: () =>
      import("../views/Connect.vue")
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () =>
        import('../views/Terms.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
