import debounce from 'lodash/debounce';

export default class Drop {
    constructor(containerSelector, drag) { // css selector representing dropzone id
        this.containerSelector = containerSelector
        this.container = document.querySelector(this.containerSelector)
        this.iframe = null
        this.drag = drag
        // this.mirrorContainer = null
        this.mirrorElement = null
        this.debouncedHandleDrag = debounce(this.dragOver, 300, { maxWait: 500 })
    }
    //Setters
    setIframeContext(iframe) {
        this.iframe = iframe
        this.container = this.iframe.document.querySelector(this.containerSelector)
    }
    setDrag(drag) {
        this.drag = drag
    }
    //Getters
    //Events
    dragEnter(event) {
        // console.log('dragenter')
    }
    dragOver(event) {
        // console.log('dragover')
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.renderMirrorElement()
        return false;
    }
    dragLeave(event) {
        // console.log('dragleave')
    }
    drop(event) {
        // console.log('drop')
        this.append()
    }
    bindEvents() {
        this.container.addEventListener('dragenter', event => this.dragEnter(event), false) // arrow function keeps the 'this' value inside dragEnter function corresponding to class instance instead of event
        this.container.addEventListener('dragover', event => this.dragOver(event), false)
        this.container.addEventListener('dragleave', event => this.dragLeave(event), false)
        this.container.addEventListener('drop', event => this.drop(event), false)
    }
    renderMirrorElement() {
        if(this.mirrorElement === null) {
            console.log(this.drag.elementToAppend)
            this.mirrorElement = this.drag.elementToAppend.cloneNode(true)
            this.mirrorElement.classList.add('mirror-element');
            this.container.appendChild(this.mirrorElement)
        }
    }
    append() {
        console.log(this.mirrorElement)
        this.container.removeChild(this.mirrorElement)
        this.mirrorElement = null
        console.log(this.drag.elementToAppend)
        this.container.appendChild(this.drag.elementToAppend)
    }
}
