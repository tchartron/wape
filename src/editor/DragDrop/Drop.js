import { emitter } from 'Editor/DragDrop/Drag'

export default class Drop {
    constructor(container) {
        this.container = container
        this.droppable = document.querySelector(this.container)
        this.iframe = Object
        emitter.on('drop', (draggedElement) => this.append(draggedElement))
    }
    setIframeContext(iframe) {
        this.iframe = iframe
        this.droppable = this.iframe.document.querySelector(this.container)
    }
    append(element) {
        this.droppable.appendChild(element)
    }
}
