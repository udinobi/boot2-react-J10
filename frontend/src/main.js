// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from './config'
import router from './router'

Vue.config.productionTip = false

Vue.use(config)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
}).$mount('#app')

// }).$mount('#app')

// $mount allows you to explicitly mount the Vue instance when you need to.
// This means that you can delay the mounting of your vue instance until a
// particular element exists in your page or some async process has finished.
