import mitt from 'mitt'
import Event from './Event'
export const emitter = mitt()

export default class Dragger {
    constructor(draggableSelector, droppableSelector, options = {}) {
        this.draggableSelector = draggableSelector //.draggable
        this.droppableSelector = droppableSelector //#editor-content
        this.options = options
        this.clone = Object
        this.innerX = Number
        this.innerY = Number
        this.htmlTag = document.documentElement
        this.moveFunc = Object
        this.currentTemplateObject = null
        this.currentElementBehindCursor = null
        this.currentElementBeingDragged = null
        this.containerHovered = null
        this.overlay = null
        // this.droppableDocument = document
        this.events()
    }
    events() {
        let events = [ // maybe load this from external file
            {
                type: 'mousedown',
                func: this.grab
            },
            {
                type: 'mouseup',
                func: this.drop
            },
            // {
            //     type: 'touchstart',
            //     func: this.grab
            // },
            // {
            //     type: 'touchend',
            //     func: this.drop
            // },
        ]
        for(event of events) {
            // event = new Event(this.htmlTag, event.type, event.func, this)
            // event.attach(false)
            let func = event.func.bind(this)
            this.htmlTag.addEventListener(event.type, func, false)
        }
    }
    grab(event) {
        let grabbedElement = this.getDraggable(event.target)
        if(grabbedElement !== null) {
            this.createClone(grabbedElement, event)
            //Append overlay with z-index over iframe to prevent mousemove not beeing fired
            this.overlay = document.createElement('div')
            this.overlay.classList.add('overlay')
            document.getElementById('canvas').prepend(this.overlay)
        }
    }
    move(event) {
        let xPos, yPos = 0
        xPos = event.clientX - this.innerX
        yPos = event.clientY - this.innerY
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
        this.renderShadowElement(event)
    }
    drop(event) {
        // let mousemove = new Event(this.htmlTag, 'mousemove', this.move, this)
        // mousemove.detach(false)
        this.htmlTag.removeEventListener('mousemove', this.moveFunc, false)
        this.clone.remove()
        this.currentElementBeingDragged.classList.remove('shadow-elem')
        this.currentElementBeingDragged = null
        if(this.containerHovered !== null) {
            this.containerHovered.classList.remove('container-hovered')
            this.containerHovered = null
        }
        if(this.overlay !== null) {
            this.overlay.remove()
            this.overlay = null
        }
    }
    getDraggable(element) {
        if(element.matches(this.draggableSelector)) {
            return element
        } else {
            let tryToFindElem = element.closest(this.draggableSelector)
            if(tryToFindElem !== null) {
                return tryToFindElem
            } else {
                return null
            }
        }
    }
    createClone(grabbedElement, event) {
        this.clone = grabbedElement.cloneNode(true)
        this.clone.classList.add('clone')
        document.body.appendChild(this.clone)
        // let mousemove = new Event(this.htmlTag, 'mousemove', this.move, this)
        // mousemove.attach(false)
        this.moveFunc = this.move.bind(this) // store reference of new function created (by calling .bind(this)) to removeEventListener in drop function
        this.htmlTag.addEventListener('mousemove', this.moveFunc, false)
        this.innerX = event.clientX - grabbedElement.getBoundingClientRect().left
        this.innerY = event.clientY - grabbedElement.getBoundingClientRect().top
        this.clone.style.width = `${grabbedElement.getBoundingClientRect().width}px`
        this.clone.style.height = `${grabbedElement.getBoundingClientRect().height}px`
        let xPos, yPos = 0
        xPos = event.clientX - this.innerX
        yPos = event.clientY - this.innerY
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
        this.currentTemplateObject = this.getTemplateFromId(this.clone.dataset.id)
        this.currentElementBeingDragged = this.convertToDomElement(this.currentTemplateObject.content)
    }
    renderShadowElement(event) {
        let elementsBehindCursor = document.elementsFromPoint(event.clientX, event.clientY)
        if(this.overIframe(elementsBehindCursor)) { // dragging over iframe
            let elementBehindCursorInIframe = this.options.iframe.document.elementFromPoint(event.layerX, event.layerY)
            if(this.isLayout(this.currentTemplateObject)) { // dragging layout
                this.currentElementBeingDragged.classList.add('shadow-elem', 'layout')
                this.options.iframe.document.body.appendChild(this.currentElementBeingDragged)
            } else { //dragging element
                if(this.isContainer(elementBehindCursorInIframe)) {
                    this.containerHovered = elementBehindCursorInIframe
                    this.containerHovered.classList.add('container-hovered')
                    this.currentElementBeingDragged.classList.add('shadow-elem')
                    this.containerHovered.appendChild(this.currentElementBeingDragged)
                } else {
                    if(this.containerHovered !== null) {
                        this.removeElementFromContainer(this.containerHovered, this.currentElementBeingDragged)
                        this.containerHovered.classList.remove('container-hovered')
                        this.containerHovered = null
                    }
                }
            }
        } else {
            if(this.isLayout(this.currentTemplateObject)) {
                if(this.options.iframe.document.body.contains(this.currentElementBeingDragged)) {
                    this.currentElementBeingDragged.classList.remove('shadow-elem', 'layout')
                    this.options.iframe.document.body.removeChild(this.currentElementBeingDragged)
                }
            }
        }
    }
    getTemplateFromId(id) {
        return this.options.templates.find((template) => {
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
    convertToDomElement(htmlString) {
        let domElement = null
        if (this.supportDomParser()) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(htmlString, 'text/html');
            domElement = doc.body.firstChild
        } else {
            console.log('Browser not supported')
        }
        return domElement
    }
    // isDroppable(element) {
    //     return (element.matches(this.droppableSelector))
    // }
    overIframe(elements) {
        return elements.some((elem) => {
            return (elem.matches('#iframe'))
        })
    }
    isContainer(element) {
        if(element === null) {
            return false
        }
        return (element.matches('.layout'))
    }
    isLayout(element) {
        return (element.type === 'layout')
    }
    removeElementFromContainer(container, element) {
        container.removeChild(element)
    }
    elementExists(idSelector) {
        return !!document.getElementById(idSelector)
    }

}
