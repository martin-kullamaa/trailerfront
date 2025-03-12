import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TrailDetailsView from "@/views/TrailDetailsView.vue";
import NewTrailView from "@/views/NewTrailView.vue";
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
    name: 'newTrailRoute',
    component: NewTrailView
  },
    // todo: vaja saada locationStartId HomeView'st (MapComponentist emittida) ja see anda kaasa
    // todo: allolevale view'le.
    // todo: IF click on marker on MapComponent (child of HomeView)
    // todo: MapComponent emit what startingpoint marker was clicked to HomeView
    // todo: HomeView PUSH to TrailView and give locationStartId along
  {
    path: '/trail/:startId',
    name: 'trailRoute',
    component: TrailView
  },
  {
    path: '/trail-details/:trailId',
    name: 'trailDetailsRoute',
    component: TrailDetailsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
