import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: '/login',
    name: 'logeinRoute',
    component: LoginView
    // TODO: fix name
  },
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
