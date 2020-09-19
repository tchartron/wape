import Vue from 'vue'
import VueRouter from 'vue-router'
import Wape from './components/Wape.vue'

Vue.use(VueRouter)

Vue.config.silent = (process.env.NODE_ENV === 'production') ? true : false
Vue.config.performance =  (process.env.NODE_ENV === 'production') ? false : true
Vue.config.devtools =  (process.env.NODE_ENV === 'production') ? false : true
Vue.config.productionTip =  (process.env.NODE_ENV === 'production') ? false : true

export default {
    init(options) {
        new Vue({
            render: h => h(Wape, {
                props: {}
            }),
        }).$mount(options.mount)
    }
}
