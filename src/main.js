import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import "/icons"

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD');
    }
});
Vue.filter('formatDateTime', function(value) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD HH:mm:ss');
    }
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')