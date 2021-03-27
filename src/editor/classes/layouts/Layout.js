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
    displayToolbar() {
        let toolbar = document.createElement("div")
        toolbar.className = "toolbar"
        let html = `
            <div class="up"><i class="fas fa-arrow-up"></i></div>
            <div class="down"><i class="fas fa-arrow-down"></i></div>
            <div class="duplicate"><i class="far fa-copy"></i></div>
            <div class="delete"><i class="fas fa-trash-alt"></i></div>`
        toolbar.innerHTML = html;
        let element_position = this.element.getBoundingClientRect()
        let top = `${element_position.top}px`
        let right = `${element_position.right - element_position.width}px`
        toolbar.style.top = top
        toolbar.style.right = right
        this.element.appendChild(toolbar)
    }
}
