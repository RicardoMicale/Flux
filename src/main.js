import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { fas } from '@fortawesome/free-solid-svg-icons';
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
    faMinus
} from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faAngleRight, faEye, faCheck, faCircle, faAngleLeft, 
    faExternalLinkAlt, faPlus, faTimes, faEnvelope, 
    faTwitter, faInstagram, faMinus,fas
    );

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
