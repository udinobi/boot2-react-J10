import Vue from 'vue'
import Router from 'vue-router'

import About from '@/components/About'
import Locations from '@/components/Locations'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'Locations',
            component: Locations
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
})
