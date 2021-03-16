export default class Layout {
    constructor(element, type) {
        this.element = element // html element
        this.type = type
    }

    addClass(css_class) {
        this.element.classList.add(css_class)
    }
    removeClass(css_class) {
        this.element.classList.remove(css_class)
    }
    getClassesAsArray() {
        return [...this.element.classList]
    }
}
