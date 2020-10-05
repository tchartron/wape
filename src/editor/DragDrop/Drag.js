import mitt from 'mitt'
export const emitter = mitt()

export default class Drag {
    constructor(containers, templates = {}) {
        this.elements = document.querySelectorAll(containers)
        this.bindEvents()
        this.clone = null
        this.dragging = false
        this.width
        this.height
        this.releasedX
        this.releasedY
        this.templates = templates
        this.domElement = Object // the converted to dom element currently dragged
    }
    bindEvents() {
        if (this.elements instanceof NodeList || this.elements instanceof Array) {
          this.elements = [...this.elements];
        } else if (this.element instanceof HTMLElement) {
          this.elements = [this.elements];
        } else {
          throw new Error('Containers should be of type `NodeList`, `HTMLElement[]` or `HTMLElement`');
        }
        [...this.elements].forEach((element) => {
          element.addEventListener('mousedown', (event) => this.dragStart(event, element), false)
          element.addEventListener('touchstart', (event) => this.dragStart(event, element), false)

        });
    }
    dragStart(event, elem) {
        let template = this.getTemplateFromId(elem.dataset.id)
        this.domElement = this.convertToDomElement(template)
        this.clone = elem.cloneNode(true)
        this.clone.classList.add('dragging')
        document.body.appendChild(this.clone)
        this.clone.addEventListener('mousemove', (event) => this.drag(event), false)
        this.clone.addEventListener('touchmove', (event) => this.drag(event), false)
        this.clone.addEventListener('mouseup', (event) => this.dragEnd(event), false)
        this.clone.addEventListener('touchend', (event) => this.dragEnd(event), false)
        this.width = this.clone.getBoundingClientRect().width
        this.height = this.clone.getBoundingClientRect().height
        let xPos, yPos = 0
        if (event.type === 'touchstart') {
            xPos= event.touches[0].clientX - (this.width / 2)
            yPos = event.touches[0].clientY - (this.height / 2)
        } else {
            xPos = event.clientX - (this.width / 2)
            yPos = event.clientY - (this.height / 2)
        }
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
        this.dragging = true
    }
    drag(event) {
        if (this.dragging) {
            event.preventDefault();
            if (event.type === 'touchmove') {
                this.currentX = event.touches[0].clientX - (this.width / 2)
                this.currentY = event.touches[0].clientY - (this.height / 2)
            } else {
                this.currentX = event.clientX - (this.width / 2)
                this.currentY = event.clientY - (this.height / 2)
            }
            this.clone.style.left = `${this.currentX}px`
            this.clone.style.top = `${this.currentY}px`
        }
    }
    dragEnd(event) {
        this.releasedX = event.clientX
        this.releasedY = event.clientY
        this.clone.remove()
        this.dragging = false;
        emitter.emit('drop', this.domElement)
    }
    getTemplateFromId(id) {
        return this.templates.find((template) => {
            return (template.id == id)
        })
    }
    supportDomParser() { // Credits => gomakethings.com
        if (!window.DOMParser) {
            return false
        }
        let parser = new DOMParser();
        try {
            parser.parseFromString('x', 'text/html');
        } catch(err) {
            return false
        }
        return true
    }
    convertToDomElement(template) {
        let domElement = null
        if (this.supportDomParser()) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(template.content, 'text/html');
            domElement = doc.body.firstChild
        } else {
            console.log('Browser not supported')
        }
        return domElement
    }
}
