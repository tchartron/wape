import { emitter } from 'Editor/DragDrop/Drag'

export default class Drop {
    constructor(container) {
        this.container = container
        this.droppable = document.querySelector(this.container)
        this.iframe = Object
        this.clone = Object
        emitter.on('dragstart', (args) => this.displayShadowElement(args.domElement, args.clone))
        emitter.on('drop', (draggedElement) => this.append(draggedElement))
    }
    setIframeContext(iframe) {
        this.iframe = iframe
        this.droppable = this.iframe.document.querySelector(this.container)
    }
    append(element) {
        this.droppable.appendChild(element)
    }
    displayShadowElement(element, clone) {
        this.clone = clone
        console.log(clone)
        this.clone.hidden = true;
        let elemBelow = document.elementFromPoint(this.currentX, this.currentY);
        this.clone.hidden = false;
        console.log(elemBelow)
        let droppableBelow = elemBelow.closest('.droppable') || elemBelow.closest('#editor-content');
        console.log(droppableBelow)
    }
}
