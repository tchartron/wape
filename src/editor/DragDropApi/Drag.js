export default class Drag {
    constructor(template, element) {
        this.template = template, // Object coming from templates.js beind dragged
        this.element = element
        this.elementToAppend = this.convertToDomElement(template) // Dragged elem .content (html string) property converted to dom element with DomParser()
    }
    //Events
    // dragStart() {
    //     console.log('dragstart')
    // }
    drag(event) {
        // console.log('drag')
    }
    dragEnd(event) {
        // console.log('dragend')
    }
    bindEvents() {
        // this.element.addEventListener('dragstart', this.dragStart, false) // already binded in vue component
        this.element.addEventListener('drag', this.drag, false)
        this.element.addEventListener('dragend', this.dragEnd, false)
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
