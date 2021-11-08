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
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faAngleRight, faEye, faCheck, faCircle, faAngleLeft, 
    faExternalLinkAlt, faPlus, faTimes, faEnvelope, 
    faTwitter, faInstagram
    );
// library.add(faEye);
// library.add(faCheck);
// library.add(faCircle);
// library.add(faAngleLeft);
// library.add(faExternalLinkAlt);
// library.add(faPlus);
// library.add(faTimes);
// library.add(faEnvelope);
// library.add(faTwitter);
// library.add(faInstagram);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
