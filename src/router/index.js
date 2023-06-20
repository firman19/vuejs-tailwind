import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import BlogList from "@/views/BlogList.vue";
import BlogAdd from "@/views/BlogAdd.vue";
import BlogDetail from "@/views/BlogDetail.vue";
import BlogEdit from "@/views/BlogEdit.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import CommentEdit from "@/views/CommentEdit.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blogs",
    name: "BlogList",
    component: BlogList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blogs/edit/:id",
    name: "BlogEdit",
    component: BlogEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/comments/edit/:id",
    name: "CommentEdit",
    component: CommentEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blogs/add",
    name: "BlogAdd",
    component: BlogAdd,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/blogs/:id",
    name: "BlogDetail",
    component: BlogDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!JSON.parse(localStorage.getItem("accessToken"))) {
      next({ name: "Login" });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});

export default router;
