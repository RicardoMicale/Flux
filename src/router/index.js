import { createRouter, createWebHashHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import Flujograma from '../views/Flujograma.vue';
import Acerca from '../views/Acerca.vue';
import Agregar from '../views/Agregar.vue';
import Materia from '../views/Materia.vue';
import Login from '../views/Login.vue';
import Perfil from '../views/Perfil.vue';
import NotFound from '../views/NotFound.vue';
import Discusion from '../views/Discusion.vue';
import Editar from '../views/Editar.vue';

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
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/discusion/:id',
    name: 'Discusion',
    component: Discusion
  },
  {
    path: '/editar_trimestre',
    name: 'Editar',
    component: Editar
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
