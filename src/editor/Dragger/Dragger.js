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
        this.currentTemplateObject
        this.currentElementBehindCursor = null
        this.currentElementBeingDragged = null
        this.containerHovered = null
        // this.droppableDocument = this.options.iframe.window.document || document
        this.droppableDocument = document
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
        let elementBeingDragged = this.getDraggable(event.target)
        if(elementBeingDragged !== null) {
            this.createClone(elementBeingDragged, event)
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
        console.log('drop', event)
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
        // this.currentElementBehindCursor.appendChild(this.shadowElement)
        // this.shadowElement = null
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
        // this.currentElementBeingDragged.classList.add('shadow-elem')
    }
    renderShadowElement(event) {
        // console.log(this.clone)
        // let elementBehindCursor = this.droppableDocument.elementsFromPoint(event.clientX, event.clientY)
        let elementsBehindCursor = this.droppableDocument.elementsFromPoint(event.clientX, event.clientY)
        // this.clone.hidden = false
        // if(this.isDroppable(elementBehindCursor)) {
        //     if(this.shadowElement === null) {
        //         console.log("1")
        //         // console.log(elementBehindCursor)
        //         // console.log(this.currentElementBehindCursor)
        //         this.currentElementBehindCursor = elementBehindCursor
        //         this.shadowElement = this.currentElementBeingDragged
        //         this.currentElementBehindCursor.appendChild(this.shadowElement)
        //     } else {
        //         console.log("2")
        //         // console.log(elementBehindCursor)
        //         // console.log(this.currentElementBehindCursor)
        //         if(this.currentElementBehindCursor !== elementBehindCursor && elementBehindCursor !== this.shadowElement) {
        //         console.log("3")
        //         // console.log(elementBehindCursor)
        //         // console.log(this.currentElementBehindCursor)
        //             // this.currentElementBehindCursor.removeChild(templateConvertedToDomElem)
        //             this.shadowElement.remove()
        //             this.shadowElement = null
        //             this.currentElementBehindCursor = elementBehindCursor
        //             this.currentElementBehindCursor.appendChild(templateConvertedToDomElem)
        //         }
        //     }
        // } else {
        //         console.log("4")
        //     if(this.shadowElement === null) {
        //         console.log("5")
        //         // this.currentElementBehindCursor.removeChild(templateConvertedToDomElem)
        //         this.shadowElement.remove()
        //         this.shadowElement = null
        //     }
        // }
        // console.log(this.currentElementBeingDragged)
        // console.log(event)
        // console.log(elementBehindCursor)
        // console.log(this.currentElementBehindCursor)
        // console.log(elementBehindCursor)
        // console.log(this.isDroppable(elementBehindCursor))
        // console.log(this.hasIframe(elementBehindCursor))
        if(this.overIframe(elementsBehindCursor)) { // dragging over iframe
            // let iframeDocument = this.options.iframe.document
            let elementBehindCursorInIframe = this.options.iframe.document.elementFromPoint(event.clientX, event.clientY)
            if(this.isLayout(this.currentTemplateObject)) { // dragging layout
                this.currentElementBeingDragged.classList.add('shadow-elem', 'layout')
                this.options.iframe.document.body.appendChild(this.currentElementBeingDragged)
            } else { //dragging element
                // console.log(elementBehindCursorInIframe)
                // console.log(this.overContainer(elementBehindCursorInIframe))
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
                // console.log('element over layout')
                // let iframeBody = iframeDocument.body
                // console.log(this.currentElementBeingDragged)
                // this.currentElementBeingDragged.classList.add('shadow-elem', 'layout')
                // iframeBody.appendChild(this.currentElementBeingDragged)
            }
            // console.log(elementBehindCursorInIframe)
            // if(this.isDroppable(elementBehindCursorInIframe)) {
            //     console.log('entered')
            //     this.currentElementBehindCursor = elementBehindCursorInIframe
            //     this.currentElementBehindCursor.appendChild(this.currentElementBeingDragged)
            //     // this.shadowElement = this.currentElementBeingDragged
            // }
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
    isDroppable(element) {
        // if(elements === null) {
        //     return false
        // }
        // return elements.some((elem) => {
        //     return (elem.matches(this.droppableSelector))
        // })
        return (element.matches(this.droppableSelector))
    }
    overIframe(elements) {
        return elements.some((elem) => {
            return (elem.matches('#iframe'))
        })
    }
    isContainer(element) {
         return (element.matches('.layout'))
    }
    isLayout(element) {
        return (element.type === 'layout')
    }
    removeElementFromContainer(container, element) {
        console.log(container)
        container.removeChild(element)
    }

}
