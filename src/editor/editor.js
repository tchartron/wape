import Vue from 'vue'
import Wape from './components/Wape.vue'

export default {
    init(options) {
        new Vue({
            render: h => h(Wape, {
                props: {}
            }),
        }).$mount(options.mount)
    }
}
