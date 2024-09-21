import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import RecipeDetailPage from "../views/RecipeDetailPage.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/recipe/:id", name: "RecipeDetail", component: RecipeDetailPage },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
