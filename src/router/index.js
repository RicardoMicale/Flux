import { createRouter, createWebHashHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import Flujograma from '../views/Flujograma.vue';
import Acerca from '../views/Acerca.vue';
import Agregar from '../views/Agregar.vue';
import Materia from '../views/Materia.vue';

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
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: Agregar
  },
  {
    path: '/materias/:id',
    name: 'Materia',
    component: Materia
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
