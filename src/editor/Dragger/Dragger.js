import mitt from 'mitt'
import Event from './Event'
export const emitter = mitt()

export default class Dragger {
    // constructor(draggableSelector, droppableSelector, options = {}) {
    constructor(draggableSelector, options = {}) {
        this.draggableSelector = draggableSelector //.draggable
        // this.droppableSelector = droppableSelector //#editor-content
        this.options = options
        this.clone = Object
        this.innerX = Number
        this.innerY = Number
        this.htmlTag = document.documentElement // main html tag
        this.moveFunc = Object //Used to save the reference to move function with 'this' context (class) binded
        this.objectDragged = null //Object from element.js or layout.js being dragged
        this.elementDragged = null //.content key of this.objectDragged transformed to dom element
        this.currentElementBehindCursor = null //Element behind cursor while dragging
        this.containerHovered = null //container behind cursor while dragging an element
        this.overlay = null //Used to be appended over iframe to preserve the mousemove event
        // this.shadowElementPlacedInGrid = false
        this.currentAppendIndex = 0
        this.gridIsFilled = false
        this.gridLayout = Object
        // this.shadowElementPlacedInGrid = false // Flag to repace only one element while over a grid container as move is fired multiple times
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
        let grabbedElement = this.getDraggable(event.target, this.draggableSelector)
        if(grabbedElement !== null) {
            //Append overlay with z-index over iframe to prevent mousemove not beeing fired
            this.overlay = document.createElement('div')
            this.overlay.classList.add('overlay')
            document.getElementById('canvas').prepend(this.overlay)
            this.objectDragged = this.getTemplateFromId(grabbedElement.dataset.id)
            this.elementDragged = this.convertToDomElement(this.objectDragged.content)
            if(this.isGrid(this.elementDragged)) {
                // let colsAmount = this.countGridCols(this.elementDragged)
                // let rowsAmount = this.countGridRows(this.elementDragged)
                this.gridLayout = {
                    cols: this.countGridCols(this.elementDragged),
                    rows: this.countGridRows(this.elementDragged),
                    isFull: false,
                    appendIndex: this.getAppendIndex(this.elementDragged)
                }
            }
            this.createClone(grabbedElement, event)
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
        // console.log(this.clone)
        if(this.elementDragged === null) {
            return false
        }
        this.clone.remove()
        if(this.isGrid(this.elementDragged)) {
            let totalChilds = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
            // this.createGridLayoutChilds(this.elementDragged)
            this.createElementAndAppend('div', this.elementDragged, totalChilds, 'grid-placeholder')
        }
        this.shadowElementPlacedInGrid = false // Reset flag telling if shadow element is currently placed in grid
        this.objectDragged = null
        this.elementDragged.classList.remove('shadow-elem')
        this.elementDragged = null
        if(this.containerHovered !== null) {
            this.containerHovered.classList.remove('container-hovered')
            this.currentAppendIndex++
            if(this.isGrid(this.containerHovered)) {
                if(this.gridIsFull(this.containerHovered)) {
                    this.gridIsFilled = true
                } else {
                    this.gridIsFilled = false
                }
                // console.log(this.currentAppendIndex)
            }
            this.containerHovered = null
        }
        if(this.overlay !== null) {
            this.overlay.remove()
            this.overlay = null
        }
    }
    getDraggable(element, draggableSelector) {
        if(element.matches(draggableSelector)) {
            return element
        } else {
            let tryToFindElem = element.closest(draggableSelector)
            if(tryToFindElem !== null) {
                return tryToFindElem
            } else {
                return null
            }
        }
    }
    createClone(grabbedElem, event) {
        this.clone = grabbedElem.cloneNode(true)
        this.clone.classList.add('clone')
        document.body.appendChild(this.clone)
        this.innerX = event.clientX - grabbedElem.getBoundingClientRect().left
        this.innerY = event.clientY - grabbedElem.getBoundingClientRect().top
        this.clone.style.width = `${grabbedElem.getBoundingClientRect().width}px`
        this.clone.style.height = `${grabbedElem.getBoundingClientRect().height}px`
        let xPos, yPos = 0
        xPos = event.clientX - this.innerX
        yPos = event.clientY - this.innerY
        this.clone.style.left = `${xPos}px`
        this.clone.style.top = `${yPos}px`
        // let mousemove = new Event(this.htmlTag, 'mousemove', this.move, this)
        // mousemove.attach(false)
        this.moveFunc = this.move.bind(this) // store reference of new function created (by calling .bind(this)) to removeEventListener in drop function
        this.htmlTag.addEventListener('mousemove', this.moveFunc, false)
    }
    renderShadowElement(event) {
        let elementsBehindCursor = document.elementsFromPoint(event.clientX, event.clientY)
        if(this.overIframe(elementsBehindCursor)) { // dragging over iframe
            if(this.isLayout(this.objectDragged)) { // dragging layout
                this.elementDragged.classList.add('shadow-elem', 'layout')
                this.options.iframe.document.body.appendChild(this.elementDragged)
            } else { //dragging element
                let elementsBehindCursorInIframe = this.options.iframe.document.elementsFromPoint(event.layerX, event.layerY)
                if(this.overContainer(elementsBehindCursorInIframe)) {
                    // if(this.containerHovered !== null) {
                    //     this.containerHovered.classList.remove('container-hovered') // remove previous container blue border
                    // }
                    if(this.containerHovered !== this.findContainer(elementsBehindCursorInIframe)) { //if shadow elem for this container has not already been rendered (ie: we changed container)
                        if(this.containerHovered !== null) {
                            this.containerHovered.classList.remove('container-hovered') // remove previous container blue border
                            this.removeElementFromContainer(this.containerHovered, this.elementDragged)
                             if(this.isGrid(this.containerHovered)) { //Previous grid hovered
                                //container we just left was a grid container we need to reappend the placeholder div
                                this.gridLayout = {
                                    cols: this.countGridCols(this.containerHovered),
                                    rows: this.countGridRows(this.containerHovered),
                                    isFull: this.gridIsFull(this.containerHovered),
                                    appendIndex: this.getAppendIndex(this.containerHovered)
                                }
                                console.log(this.gridLayout)
                                let totalPlacesInGrid = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
                                let elementsInGrid = this.countElementsInGrid(this.containerHovered)
                                let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
                                // console.log(totalPlacesInGrid)
                                // console.log(this.countElementsInGrid(this.containerHovered, '.grid-placeholder'))
                                // console.log(numberOfPlaceholdersToAppend)
                                if (numberOfPlaceholdersToAppend > 0) {
                                    this.createElementAndAppend('div', this.containerHovered, numberOfPlaceholdersToAppend, 'grid-placeholder')
                                }
                             }
                        }
                        this.containerHovered = this.findContainer(elementsBehindCursorInIframe)
                        this.containerHovered.classList.add('container-hovered')
                        this.elementDragged.classList.add('shadow-elem')
                        if(this.isGrid(this.containerHovered)) {
                            // let colsAmount = this.countGridCols(this.containerHovered)
                            // let rowsAmount = this.countGridRows(this.containerHovered)
                            this.gridLayout = {
                                cols: this.countGridCols(this.containerHovered),
                                rows: this.countGridRows(this.containerHovered),
                                isFull: this.gridIsFull(this.containerHovered),
                                appendIndex: this.getAppendIndex(this.containerHovered)
                            }
                            // console.log(this.gridLayout)
                            // console.log(this.shadowElementPlacedInGrid)
                            // if(!this.shadowElementPlacedInGrid && !this.gridIsFull(this.containerHovered)) {
                            // if(!this.gridLayout.isFull && !this.shadowElementPlacedInGrid) {
                            if(!this.gridLayout.isFull) {
                                // this.shadowElementPlacedInGrid = true
                                this.removeGridFirstChildMatching(this.containerHovered, '.grid-placeholder')
                                this.containerHovered.insertBefore(this.elementDragged, this.containerHovered.children[this.gridLayout.appendIndex])
                            }
                        } else {
                            this.containerHovered.insertBefore(this.elementDragged, this.containerHovered.children[this.currentAppendIndex])
                        }
                    }
                } else { // over iframe but not over container
                    if(this.containerHovered !== null) {
                        console.log('here1')
                        this.containerHovered.classList.remove('container-hovered')
                        this.removeElementFromContainer(this.containerHovered, this.elementDragged)
                        // if(this.isGrid(this.containerHovered) && !this.gridIsFilled) {
                        if(this.isGrid(this.containerHovered)) {
                            // this.shadowElementPlacedInGrid = false
                            console.log('here2')
                            this.gridLayout = {
                                cols: this.countGridCols(this.containerHovered),
                                rows: this.countGridRows(this.containerHovered),
                                isFull: this.gridIsFull(this.containerHovered),
                                appendIndex: this.getAppendIndex(this.containerHovered)
                            }
                            let totalPlacesInGrid = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
                            let elementsInGrid = this.countElementsInGrid(this.containerHovered)
                            let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
                            // console.log(totalPlacesInGrid)
                            // console.log(this.countElementsInGrid(this.containerHovered, '.grid-placeholder'))
                            // console.log(numberOfPlaceholdersToAppend)
                            if (numberOfPlaceholdersToAppend > 0) {
                                this.createElementAndAppend('div', this.containerHovered, numberOfPlaceholdersToAppend, 'grid-placeholder')
                            }
                            //Put back the placeholder div in grid we just left
                            // let div = document.createElement('div');
                            // div.classList.add('grid-placeholder')
                            // this.containerHovered.appendChild(div)
                        }
                        this.containerHovered = null
                    }
                }
            }
        } else { //Gets out of iframe
            if(this.isLayout(this.objectDragged)) {
                if(this.options.iframe.document.body.contains(this.elementDragged)) {
                    this.elementDragged.classList.remove('shadow-elem', 'layout')
                    this.options.iframe.document.body.removeChild(this.elementDragged)
                }
            } else { //Is dragging element
                if(this.options.iframe.document.body.contains(this.elementDragged)) {
                    this.elementDragged.classList.remove('shadow-elem')
                    this.elementDragged.remove()
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
    overIframe(elements) {
        return elements.some((elem) => {
            return (elem.matches('#iframe'))
        })
    }
    overContainer(elements) {
        return elements.some((elem) => {
            return (elem.matches('.layout'))
        })
    }
    findContainer(elements) {
        return elements.find((elem) => {
            return (elem.matches('.layout'))
        })
    }
    isLayout(element) {
        return (element.type === 'layout')
    }
    isGrid(element) {
        return (element.matches('.grid'))
    }
    removeElementFromContainer(container, element) {
        if (element.parentNode == container) {
            container.removeChild(element)
        }
    }
    elementExists(idSelector) {
        return !!document.getElementById(idSelector)
    }
    // createGridLayoutChilds(element) {
        // let classList = element.className.split(' ')
        // if(classList.includes('grid')) {
        //     let colsAmount, rowsAmount = 0
        //     let colsClass = classList.find((elem) => {
        //         return (elem.match(/grid-cols-([0-9])/) !== null)
        //     })
        //     let rowsClass = classList.find((elem) => {
        //         return (elem.match(/grid-rows-([0-9])/) !== null)
        //     })
        //     if(typeof colsClass !== 'undefined') {
        //         let matchCols = colsClass.match(/grid-cols-([0-9])/)
        //         if(matchCols !== null) {
        //             colsAmount = matchCols[1]
        //         }
        //     }
        //     if(typeof rowsClass !== 'undefined') {
        //         let matchRows = rowsClass.match(/grid-rows-([0-9])/)
        //         if(matchRows !== null) {
        //             rowsAmount = matchRows[1]
        //         }
        //     }
            // let colsAmount = this.countGridCols(element)
            // let rowsAmount = this.countGridRows(element)
            // let totalChilds = colsAmount * rowsAmount
            // for(let i = 0; i < totalChilds; i++) {
            //     let div = document.createElement('div');
            //     div.classList.add('grid-placeholder')
            //     this.elementDragged.appendChild(div)
            // }
            //Append placeholders div inside grid layout
            // this.createElementAndAppend('div', this.elementDragged, totalChilds, 'grid-placeholder')

                //Add editiing grid functionnalitu to add rows and cols
                //Replace child div with element when an elements is dropped inside the grid
                //Add the grid responsivness functionnality
        // }
    // }
    countGridRows(element) {
        let classList = element.className.split(' ')
        let rowsAmount = 0
        if(classList.includes('grid')) {
            let rowsClass = classList.find((elem) => {
                return (elem.match(/grid-rows-([0-9])/) !== null)
            })
            if(typeof rowsClass !== 'undefined') {
                let matchRows = rowsClass.match(/grid-rows-([0-9])/)
                if(matchRows !== null) {
                    rowsAmount = matchRows[1]
                }
            }
        }
        return rowsAmount
    }
    countGridCols(element) {
        let classList = element.className.split(' ')
        let colsAmount = 0
        if(classList.includes('grid')) {
            let colsClass = classList.find((elem) => {
                return (elem.match(/grid-cols-([0-9])/) !== null)
            })
            if(typeof colsClass !== 'undefined') {
                let matchCols = colsClass.match(/grid-cols-([0-9])/)
                if(matchCols !== null) {
                    colsAmount = matchCols[1]
                }
            }
        }
        return colsAmount
    }
    createElementAndAppend(elementType, container, numberToAppend, classToAdd = '') {
        for(let i = 0; i < numberToAppend; i++) {
            let div = document.createElement(elementType);
            if(classToAdd !== '') {
                div.classList.add(classToAdd)
            }
            container.appendChild(div)
        }
    }
    removeGridFirstChildMatching(container, cssClass) {
        // if(container.matches('.grid')) {
            let firstChildPlaceholder = container.querySelector(cssClass)
            if(firstChildPlaceholder !== null) {
                container.removeChild(firstChildPlaceholder)
                // this.shadowElementPlacedInGrid = true
            }
        // }
    }
    gridIsFull(container) {
        return (container.querySelector('.grid-placeholder') === null)
    }
    getAppendIndex(container) {
        let firstChildMatching = container.querySelector('.grid-placeholder')
        if(firstChildMatching === null) {
            return null
        }
        return [...firstChildMatching.parentNode.children].indexOf(firstChildMatching)
    }
    countElementsInGrid(container) {
        return container.children.length
    }
}
