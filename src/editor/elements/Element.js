export default class Element {
    constructor(element) {
        this.element = element // html element
    }
    // get element() {
    //     return this.element
    // }

    // set element(element) {
    //     this.element = element
    // }

    addClass(cssClass) {
        this.element.classList.add(cssClass)
    }
    removeClass(cssClass) {
        this.element.classList.remove(cssClass)
    }
}