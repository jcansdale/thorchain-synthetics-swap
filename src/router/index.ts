import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/synths",
    name: "Synths",
    component: () =>
        import('../views/Synths/Synths.vue')
  },
  {
    path: '/native',
    name: 'Native',
    component: () =>
        import('../views/Native/Native.vue')
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
