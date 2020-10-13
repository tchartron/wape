export default class Event {
    constructor(element, type, func, bindThis = null) {
        this.element = element
        this.type = type
        if(bindThis !== null) {
            this.func = func.bind(bindThis)
        } else {
            this.func = func
        }
    }
    attach(useCapture = false) {
        this.element.addEventListener(this.type, (e) => this.func(e), useCapture)
    }
    detach(useCapture = false) {
        this.element.removeEventListener(this.type, (e) => this.func(e), useCapture)
    }
}
