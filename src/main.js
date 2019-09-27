import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

import Multiselect from 'vue-multiselect';
import VModal from 'vue-js-modal';

Vue.component('multiselect', Multiselect);
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } });
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: h => h(App),
}).$mount('#app');
