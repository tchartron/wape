import mitt from 'mitt'
import Event from './Event'
export const emitter = mitt()

export default class Dragger {
    constructor(draggableContainer, options = {}) {
        this.draggableContainer = draggableContainer
        this.options = options
        this.events()
        this.clone = Object
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
        let doc = document.documentElement
        for(event of events) {
            event = new Event(doc, event.type, event.func, this)
            event.attach(false)
        }
    }
    grab(event) {
        let elementBeingDragged = this.getDraggable(event.target)
        if(elementBeingDragged !== null) {
            this.createClone(elementBeingDragged, event)
        }
    }
    move(event) {
        console.log('move', event)
        // this.width = this.clone.getBoundingClientRect().width
        // this.height = this.clone.getBoundingClientRect().height
        let xPos, yPos = 0
        // if (event.type === 'touchmove') {
        //     xPos= event.touches[0].clientX - (this.width / 2)
        //     yPos = event.touches[0].clientY - (this.height / 2)
        // } else {
            xPos = event.clientX - (this.clone.getBoundingClientRect().width / 2)
            yPos = event.clientY - (this.clone.getBoundingClientRect().height / 2)
        // }
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
    }
    drop(event) {
        console.log('drop', event)
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
    createClone(element, event) {
        this.clone = element.cloneNode(true)
        this.clone.classList.add('clone')
        document.body.appendChild(this.clone)
        let mousemove = new Event(this.clone, 'mousemove', this.move, this)
        mousemove.attach(false)
        //Initial position
        let xPos, yPos = 0
        // if (event.type === 'touchmove') {
        //     xPos= event.touches[0].clientX - (this.clone.getBoundingClientRect().width / 2)
        //     yPos = event.touches[0].clientY - (this.clone.getBoundingClientRect().height / 2)
        // } else {
            xPos = event.clientX - (this.clone.getBoundingClientRect().width / 2)
            yPos = event.clientY - (this.clone.getBoundingClientRect().height / 2)
        // }
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
    }

}
