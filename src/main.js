import { createApp } from 'vue'
import App from './App.vue'
import style from './assets/style.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import router from "@/plugins/router";
import store from "@/plugins/store";

library.add(faUserSecret, faUser, faHouse, faUsers, faEllipsis, faSliders, faAngleDown, faTrash,faPenToSquare)

createApp(App)
    .use(style)
    .use(router)
    .use(store)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
