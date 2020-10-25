import Editor from 'Editor/Editor'
import mitt from 'mitt'
export const emitter = mitt()

export default class Wape {
    constructor(options) {
        this.options = options
        this.init()
    }
    init() {
        let editor = new Editor(this.options.el)
    }
}
