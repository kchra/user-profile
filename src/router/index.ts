import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserForm from "@/components/user-form/UserForm.vue";
import Home from "@/components/user-profile/UserProfile.vue";
import notFound from "../components/404/404.vue";

import { useReturnLocalStorageData } from "@/use/localStorage";
import { hasEmptyValues } from "../helpers";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user-form",
    name: "UserForm",
    component: UserForm,
  },
  {
    path: "/page-not-found",
    name: "notFound",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length) {
    if (to.name !== "UserForm" && hasEmptyValues(useReturnLocalStorageData())) {
      next({ name: "UserForm" });
    } else {
      next();
    }
  } else {
    next({ name: "Home" });
  }
});

export default router;
