import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Flujograma from '../views/Flujograma.vue';
import Acerca from '../views/Acerca.vue'

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
  },
  {
    path: '/acerca',
    name: 'Acerca',
    component: Acerca
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
