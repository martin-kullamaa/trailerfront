import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TrailView from "@/views/TrailView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/register',
    name: 'registerRoute',
    component: RegisterView
  },
  {
    path: '/trail',
    name: 'trailRoute',
    component: TrailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
