export default class Layout {
    constructor(element, type) {
        this.element = element // html element
        this.type = type
    }

    addClass(cssClass) {
        this.element.classList.add(cssClass)
    }
    removeClass(cssClass) {
        this.element.classList.remove(cssClass)
    }
    // getChildren() {
    //     return this.element.children
    // }
}
