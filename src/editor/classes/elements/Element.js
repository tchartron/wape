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
    displayToolbar() {
        // this._inner_x = event.clientX - grabbedElem.getBoundingClientRect().left
        // this._inner_y = event.clientY - grabbedElem.getBoundingClientRect().top
        let element_position = this.element.getBoundingClientRect()
        // console.log(element_position)
    }
}
