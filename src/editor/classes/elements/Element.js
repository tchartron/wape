export default class Element {
    constructor(element) {
        this.element = element // html element
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
