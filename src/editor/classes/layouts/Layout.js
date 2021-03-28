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
        //Bind events to toolbar buttons
        // toolbar.querySelector('.up').addEventListener('click', this.toolbarUpAction, false)
        toolbar.querySelector('.up').addEventListener('click', (event) => this.toolbarUpAction(this.element), false)
        toolbar.querySelector('.down').addEventListener('click', (event) => this.toolbarDownAction(this.element), false)
        toolbar.querySelector('.duplicate').addEventListener('click', (event) => this.toolbarDuplicateAction(this.element), false)
        toolbar.querySelector('.delete').addEventListener('click', (event) => this.toolbarDeleteAction(this.element), false)
    }
    toolbarUpAction(layout_element) {
        // let previous_sibling = this.element.previousElementSibling
        // while (previous_sibling) {
        //     if (previous_layout.matches(selector)) {
        //         break;
        //     }
        //     previous_sibling = previous_layout.previousElementSibling;
        // }
        if (layout_element.previousElementSibling) {
            layout_element.parentNode.insertBefore(layout_element, layout_element.previousElementSibling)
        }

    }
    toolbarDownAction(layout_element) {
        if (layout_element.nextElementSibling) {
            layout_element.parentNode.insertBefore(layout_element.nextElementSibling, layout_element)
        }
    }
    toolbarDuplicateAction(layout_element) {
        let clone = layout_element.cloneNode(true);
        layout_element.after(clone);
    }
    toolbarDeleteAction(layout_element) {
        layout_element.remove()
    }
}
