import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/file-explorer",
    name: "file-explorer",
    component: () => import("../views/FileExplorer.vue"),
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: () => import("../views/UnderConstruction.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
