import mitt from 'mitt'
import Event from './Event'
export const emitter = mitt()

export default class Dragger {
    constructor(draggableContainer, options = {}) {
        this.draggableContainer = draggableContainer //.draggable
        this.options = options
        this.clone = Object
        this.shiftX = Number
        this.shiftY = Number
        this.htmlTag = document.documentElement
        this.moveFunc = Object
        this.events()
    }
    events() {
        let events = [ // maybe load this from external file
            {
                type: 'mousedown',
                func: this.grab
            },
            // {
            //     type: 'mousemove',
            //     func: this.move
            // },
            {
                type: 'mouseup',
                func: this.drop
            },
            // {
            //     type: 'touchstart',
            //     func: this.grab
            // },
            // {
            //     type: 'touchmove',
            //     func: this.move
            // },
            // {
            //     type: 'touchend',
            //     func: this.drop
            // },
        ]
        // let draggable = this.getDraggables()
        // let doc = this.options.iframe.document.documentElement || document.documentElement
        // let doc = document.documentElement
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
        xPos = event.clientX - this.shiftX
        yPos = event.clientY - this.shiftY
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
    }
    drop(event) {
        console.log('drop', event)
        // let mousemove = new Event(this.htmlTag, 'mousemove', this.move, this)
        // mousemove.detach(false)
        this.htmlTag.removeEventListener('mousemove', this.moveFunc, false)
    }
    getDraggable(element) {
        if(element.matches(this.draggableContainer)) {
            return element
        } else {
            let tryToFindElem = element.closest(this.draggableContainer)
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
        this.shiftX = event.clientX - grabbedElement.getBoundingClientRect().left
        this.shiftY = event.clientY - grabbedElement.getBoundingClientRect().top
        this.clone.style.width = `${grabbedElement.getBoundingClientRect().width}px`
        this.clone.style.height = `${grabbedElement.getBoundingClientRect().height}px`
        let xPos, yPos = 0
        xPos = event.clientX - this.shiftX
        yPos = event.clientY - this.shiftY
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
    }

}
