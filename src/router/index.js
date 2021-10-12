import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Flujograma from '../views/Flujograma.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Landing
  },
  {
    path: '/flujograma',
    name: 'Flujograma',
    component: Flujograma
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
