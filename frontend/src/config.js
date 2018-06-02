export default {
    install(Vue, options) {
        Vue.prototype.$config = {
            serviceHost: 'http://localhost:8088',
            suggestionService: '/geo/suggest'
        }
    }
}
