import Vue from 'vue'
import Wape from './components/Wape.vue'

//process.env may not be defined check npm scripts
Vue.config.silent = (process.env.NODE_ENV === 'production') ? true : false
Vue.config.performance =  (process.env.NODE_ENV === 'production') ? false : true
Vue.config.devtools =  (process.env.NODE_ENV === 'production') ? false : true
Vue.config.productionTip =  (process.env.NODE_ENV === 'production') ? false : true

export default class Editor {
    constructor(el) {
        this.el = el
        this.init()
    }
    init() {
        new Vue({
            render: h => h(Wape, {
                props: {}
            }),
        }).$mount(this.el)
    }
}
