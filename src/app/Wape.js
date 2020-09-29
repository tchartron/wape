import Editor from 'Editor/Editor'

export default class Wape {
    constructor(options) {
        this.options = options
        this.init()
    }
    init() {
        let editor = new Editor(this.options.el)
    }
}
