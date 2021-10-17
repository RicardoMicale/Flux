import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faEye, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAngleRight);
library.add(faEye);
library.add(faCheck);
library.add(faCircle);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
