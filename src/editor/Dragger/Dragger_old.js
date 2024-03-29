// import mitt from 'mitt'
// import Event from './Event'
// export const emitter = mitt()
import { countRows, countCols } from 'Editor/utilities/grid'
import { appendPlaceholder } from 'Editor/utilities/container'

export class Dragger {
    constructor(draggableSelector, options = {}) {
        this.draggableSelector = draggableSelector //.draggable
        this.options = options
        this.clone = Object
        this.innerX = Number
        this.innerY = Number
        this.htmlTag = document.documentElement // main html tag
        this.moveFunc = Object //Used to save the reference to move function with 'this' context (class) binded
        this.objectDragged = null //Object from element.js or layout.js being dragged
        this.elementDragged = null //.content key of this.objectDragged transformed to dom element
        // this.currentElementBehindCursor = null //Element behind cursor while dragging
        this.containerHovered = null //container behind cursor while dragging an element
        this.overlay = null //Used to be appended over iframe to preserve the mousemove event
        this.currentAppendIndex = 0
        // this.gridIsFilled = false
        this.containers = []
        this.gridLayout = Object
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
            }
        ]
        for (event of events) {
            let func = event.func.bind(this)
            this.htmlTag.addEventListener(event.type, func, false)
        }
    }
    grab(event) {
        let grabbedElement = this.getDraggable(event.target, this.draggableSelector)
        if (grabbedElement !== null) {
            //Append overlay with z-index over iframe to prevent mousemove not beeing fired
            this.overlay = document.createElement('div')
            this.overlay.classList.add('overlay')
            document.getElementById('canvas').prepend(this.overlay)
            this.objectDragged = this.getTemplateFromId(grabbedElement.dataset.id)
            this.elementDragged = this.convertToDomElement(this.objectDragged.content)
            if (this.isGrid(this.elementDragged)) {
                this.gridLayout = {
                    cols: countCols(this.elementDragged),
                    rows: countRows(this.elementDragged),
                    isFull: false,
                    appendIndex: 0
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
        this.htmlTag.removeEventListener('mousemove', this.moveFunc, false)
        if (this.elementDragged === null) {
            return false
        }
        this.clone.remove()
        if (this.elementExistsInContainer(this.options.iframe.document.body, this.elementDragged)) {
            if (this.isGrid(this.elementDragged)) {
                let totalChilds = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
                appendPlaceholder('div', this.elementDragged, totalChilds, 'grid-placeholder')
            }
            if (this.isLayout(this.objectDragged)) {
                //Store new container in global containers list
                this.containers.push(this.elementDragged)
            }
        }
        this.objectDragged = null
        this.elementDragged.classList.remove('shadow-elem')
        this.elementDragged = null
        if (this.containerHovered !== null) {
            // this.containerHovered.classList.remove('container-hovered')
            this.currentAppendIndex++
            this.containerHovered = null
        }
        if(this.overlay !== null) {
            this.overlay.remove()
            this.overlay = null
        }
    }
    getDraggable(element, draggableSelector) {
        if (element.matches(draggableSelector)) {
            return element
        } else {
            let tryToFindElem = element.closest(draggableSelector)
            if (tryToFindElem !== null) {
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
        this.moveFunc = this.move.bind(this) // store reference of new function created (by calling .bind(this)) to removeEventListener in drop function
        this.htmlTag.addEventListener('mousemove', this.moveFunc, false)
    }
    renderShadowElement(event) {
        let elementsBehindCursor = document.elementsFromPoint(event.clientX, event.clientY)
        if (this.overIframe(elementsBehindCursor)) { // dragging over iframe
            if (this.isLayout(this.objectDragged)) { // dragging layout
                if (this.isFlex(this.elementDragged)) { // if container is flex add layout to it's children (ie : it's columns)
                    let htmlCollectionToArray = [...this.elementDragged.children]
                    htmlCollectionToArray.forEach(element => {
                        element.classList.add('layout')
                    })
                } else {
                    this.elementDragged.classList.add('shadow-elem', 'layout')
                }
                let closestContainer = this.firstDescendantContainer(event.layerY, this.containers)
                if (typeof closestContainer !== 'undefined') {
                    this.options.iframe.document.body.insertBefore(this.elementDragged, closestContainer)
                } else {
                    this.options.iframe.document.body.appendChild(this.elementDragged)
                }
            } else { //dragging element
                let elementsBehindCursorInIframe = this.options.iframe.document.elementsFromPoint(event.layerX, event.layerY)
                // console.log(elementsBehindCursorInIframe)
                if (this.overContainer(elementsBehindCursorInIframe)) {
                    // if (this.containerHovered !== this.findContainer(elementsBehindCursorInIframe)) { //if shadow elem for this container has not already been rendered (ie: we changed container)
                        if (this.containerHovered !== null) {
                            // this.containerHovered.classList.remove('container-hovered') // remove previous container blue border
                            console.log(elementsBehindCursor)
                             if (this.isGrid(this.containerHovered)) { //Previous grid hovered
                                //container we just left was a grid container we need to reappend the placeholder div
                                // this.gridLayout = {
                                //     cols: countCols(this.containerHovered),
                                //     rows: countRows(this.containerHovered),
                                //     isFull: this.gridIsFull(this.containerHovered),
                                //     appendIndex: this.getAppendIndex(this.containerHovered, event)
                                // }
                                // console.log(this.gridLayout)
                                let cols = countCols(this.containerHovered)
                                let rows = countRows(this.containerHovered)
                                let totalPlacesInGrid = ((cols !== 0) ? cols : 1) * ((rows !== 0) ? rows : 1)
                                let elementsInGrid = this.countElementsInGrid(this.containerHovered)
                                let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
                                if (numberOfPlaceholdersToAppend > 0) {
                                    appendPlaceholder('div', this.containerHovered, numberOfPlaceholdersToAppend, 'grid-placeholder')
                                }
                             } else {
                                this.removeElementFromContainer(this.containerHovered, this.elementDragged)
                             }
                        }
                        this.containerHovered = this.findContainer(elementsBehindCursorInIframe)
                        // this.containerHovered.classList.add('container-hovered')
                        this.elementDragged.classList.add('shadow-elem')
                        if (this.isGrid(this.containerHovered)) {
                            this.gridLayout = {
                                cols: countCols(this.containerHovered),
                                rows: countRows(this.containerHovered),
                                isFull: this.gridIsFull(this.containerHovered),
                                appendIndex: this.getAppendIndex(this.containerHovered, event)
                            }
                            if (!this.gridLayout.isFull && this.gridLayout.appendIndex !== -1) {
                                console.log('append')
                                // console.log(elementsBehindCursorInIframe)
                                // console.log(this.gridLayout.appendIndex)
                                // console.log(this.containerHovered.childNodes[this.gridLayout.appendIndex])
                                // this.containerHovered.childNodes[this.gridLayout.appendIndex].remove()
                                this.containerHovered.childNodes[this.gridLayout.appendIndex].replaceWith(this.elementDragged)
                                // this.containerHovered..children().eq(this.gridLayout.appendIndex).remove();
                                // this.removeGridFirstChildMatching(this.containerHovered, '.grid-placeholder')
                                // console.log(elementsBehindCursorInIframe)
                                // this.containerHovered.insertBefore(this.elementDragged, this.containerHovered.children[this.gridLayout.appendIndex])
                            }
                        } else {
                            console.log(this.containerHovered)
                            console.log(this.currentAppendIndex)
                            console.log(this.containerHovered.children)
                            this.containerHovered.insertBefore(this.elementDragged, this.containerHovered.children[this.currentAppendIndex])
                        }
                    // }
                } else { // over iframe but not over container
                    if (this.containerHovered !== null) {
                        console.log('here1')
                        // this.containerHovered.classList.remove('container-hovered')
                        this.removeElementFromContainer(this.containerHovered, this.elementDragged)
                        if (this.isGrid(this.containerHovered)) {
                            console.log('here2')
                            this.gridLayout = {
                                cols: countCols(this.containerHovered),
                                rows: countRows(this.containerHovered),
                                isFull: this.gridIsFull(this.containerHovered),
                                appendIndex: this.getAppendIndex(this.containerHovered, event)
                            }
                            let totalPlacesInGrid = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
                            let elementsInGrid = this.countElementsInGrid(this.containerHovered)
                            let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
                            if (numberOfPlaceholdersToAppend > 0) {
                                appendPlaceholder('div', this.containerHovered, numberOfPlaceholdersToAppend, 'grid-placeholder')
                            }
                        }
                        this.containerHovered = null
                    }
                }
            }
        } else { //Gets out of iframe
            if (this.isLayout(this.objectDragged)) {
                if (this.options.iframe.document.body.contains(this.elementDragged)) {
                    this.elementDragged.classList.remove('shadow-elem', 'layout')
                    this.options.iframe.document.body.removeChild(this.elementDragged)
                }
            } else { //Is dragging element
                if (this.options.iframe.document.body.contains(this.elementDragged)) {
                    this.elementDragged.classList.remove('shadow-elem')
                    this.elementDragged.remove()
                }
                if (this.containerHovered !== null) { // Re-add grid placeholders if we were hovering a grid and got out of iframe
                    this.gridLayout = {
                        cols: countCols(this.containerHovered),
                        rows: countRows(this.containerHovered),
                        isFull: this.gridIsFull(this.containerHovered),
                        appendIndex: this.getAppendIndex(this.containerHovered, event)
                    }
                    let totalPlacesInGrid = ((this.gridLayout.cols !== 0) ? this.gridLayout.cols : 1) * ((this.gridLayout.rows !== 0) ? this.gridLayout.rows : 1)
                    let elementsInGrid = this.countElementsInGrid(this.containerHovered)
                    let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
                    if (numberOfPlaceholdersToAppend > 0) {
                        appendPlaceholder('div', this.containerHovered, numberOfPlaceholdersToAppend, 'grid-placeholder')
                    }
                }
            }
            this.containerHovered = null // reset this guy we juste got out of iframe
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
    isFlex(element) {
        return (element.matches('.flex'))
    }
    removeElementFromContainer(container, element) {
        if (element.parentNode == container) {
            container.removeChild(element)
        }
    }
    // elementExists(idSelector) {
    //     return !!document.getElementById(idSelector)
    // }
    // appendPlaceholder(elementType, container, numberToAppend, classToAdd = '') {
    //     for (let i = 0; i < numberToAppend; i++) {
    //         let div = document.createElement(elementType);
    //         if (classToAdd !== '') {
    //             div.classList.add(classToAdd)
    //         }
    //         container.appendChild(div)
    //     }
    // }
    removeGridFirstChildMatching(container, cssClass) {
        let firstChildPlaceholder = container.querySelector(cssClass)
        if (firstChildPlaceholder !== null) {
            container.removeChild(firstChildPlaceholder)
        }
    }
    gridIsFull(container) {
        return (container.querySelector('.grid-placeholder') === null)
    }
    getAppendIndex(container, mouseMoveEvent) {
        let placeHoderHovered = null
        let elementsBehindCursor = this.options.iframe.document.elementsFromPoint(mouseMoveEvent.layerX, mouseMoveEvent.layerY)
        // console.log(elementsBehindCursor)
        placeHoderHovered = elementsBehindCursor.find((element) => {
            return (element.classList.contains('grid-placeholder'))
        })
        // console.log(placeHoderHovered)
        let containerChildren = [...container.children]
        console.log(containerChildren.indexOf(placeHoderHovered))

        return containerChildren.indexOf(placeHoderHovered)
        // console.log(elementsBehindCursor)
        // let firstChildMatching = container.querySelector('.grid-placeholder')
        // if (firstChildMatching === null) {
        //     return null
        // }
        // return containerChildren.findIndex((element) => {
        //     return (element.classList.contains('grid-placeholder'))
        // })
        // return [...firstChildMatching.parentNode.children].indexOf(firstChildMatching)
    }
    countElementsInGrid(container) {
        return container.children.length
    }
    firstDescendantContainer(y, containers) {
        if (containers.length > 0) {
            return containers.find((container) => {
                return (container.getBoundingClientRect().bottom >= y)
            })
        }
    }
    elementExistsInContainer(container, element) {
        return container.contains(element)
    }
}
