import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserForm from "@/components/user-form/UserForm.vue";
import Home from "@/components/user-profile/UserProfile.vue";
import notFound from "../components/404/404.vue";

import { useReturnLocalStorageData } from "@/use/localStorage";
import { isEmpty } from "../helpers";

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
  // {
  //   path: "/:catchAll(.*)",
  //   name: "notFound",
  //   component: notFound,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   // if (to.matched.length) {
//   const d = useReturnLocalStorageData();
//   console.log("s ", d.fisrtName);

//   if (to.name !== "UserForm" && isEmpty(d)) {
//     next({ name: "UserForm" });
//   } else {
//     next();
//   }
// } else {
//   next({ name: "notFound" });
// }
// });

export default router;
