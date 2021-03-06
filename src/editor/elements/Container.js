import { countRows, countCols } from 'Editor/utilities/grid'
import { containerType } from 'Editor/utilities/container'

export default class Container {
    constructor(element) {
        this.element = element // html element
        this.type = containerType(element)
        this.rows = countRows(element)
        this.cols = countCols(element)
    }
    // get element() {
    //     return this.element
    // }

    // set element(element) {
    //     this.element = element
    // }
    // containerType(element) {
    //     if (element.matches('.grid')) {
    //         return 'grid'
    //     }
    //     if (element.matches('.flex')) {
    //         return 'flex'
    //     }
    //     return 'container'
    // }
    addClass(cssClass) {
        this.element.classList.add(cssClass)
    }
    removeClass(cssClass) {
        this.element.classList.remove(cssClass)
    }
    getChildren() {
        return this.element.children
    }
}
