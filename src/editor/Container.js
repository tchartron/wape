import { countRows, countCols } from 'Editor/utilities/grid'

export default class Container {
    constructor(element) {
        this.element = element // html element
        this.type = this.containerType(element)
        this.rows = countRows(element)
        this.cols = countCols(element)
    }
    // get element() {
    //     return this.element
    // }

    // set element(element) {
    //     this.element = element
    // }
    containerType(element) { //Determine wether it's a grid or a simple container to allow responsive options display
        return (element.matches('.grid')) ? 'grid' : 'container'
    }
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
