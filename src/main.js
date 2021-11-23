import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faAngleRight, 
    faEye, 
    faCheck, 
    faCircle, 
    faAngleLeft, 
    faExternalLinkAlt, 
    faPlus, 
    faTimes,
    faEnvelope,
    faMinus,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faInstagram,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faAngleRight, faEye, faCheck, faCircle, faAngleLeft, 
    faExternalLinkAlt, faPlus, faTimes, faEnvelope, 
    faTwitter, faInstagram, faMinus, faGithub, faTrash
    );

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
