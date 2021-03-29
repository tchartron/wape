import {
    countRows as countGridRows,
    countCols as countGridCols,
    createPlaceholder as createGridPlaceholder
} from 'Editor/utilities/grid'
import {
    countCols as countFlexCols
} from 'Editor/utilities/flex'
import {
    appendPlaceholder,
    countChildren,
    closestDescendantLayout,
    hasChild,
    layoutType
} from 'Editor/utilities/layout'
import {
    findFirstChildMatching,
    selectorMatchFound
} from 'Editor/utilities/utilities'

export class Dragger {
    constructor(draggable_selector, options = {}) {
        this._draggable_selector = draggable_selector //.draggable
        this._options = options
        this._clone = Object
        this._inner_x = Number
        this._inner_y = Number
        this._html_tag = document.documentElement // main html tag
        this._move_func = Object //Used to save the reference to move function with 'this' context (class) binded
        this._object_dragged = null //Object from element.js or layout.js being dragged
        this._element_dragged = null //.content key of this._object_dragged transformed to dom element
        this._layout_hovered = null //container behind cursor while dragging an element
        this._overlay = null //Used to be appended over iframe to preserve the mousemove event
        this._containers = []
        this._current_placeholder_hovered = null
        this._last_layout_hovered = null
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
            this._html_tag.addEventListener(event.type, func, false)
        }
    }
    grab(event) {
        let grabbedElement = this.getDraggable(event.target, this._draggable_selector)
        if (grabbedElement !== null) {
            //Append overlay with z-index over iframe to prevent mousemove not beeing fired
            this._overlay = document.createElement('div')
            this._overlay.classList.add('overlay')
            document.getElementById('canvas').prepend(this._overlay)
            this._object_dragged = this.getBlockFromId(grabbedElement.dataset.id)
            this._element_dragged = this.convertToDomElement(this._object_dragged.content)
            this.createClone(grabbedElement, event)
            this._containers = this._options.iframe.document.body.querySelectorAll('.layout')
            // console.log(all_layouts)
        }
    }
    move(event) {
        let xPos, yPos = 0
        xPos = event.clientX - this._inner_x
        yPos = event.clientY - this._inner_y
        this._clone.style.left = `${xPos}px`
        this._clone.style.top = `${yPos}px`
        this.renderShadowElem(event)
    }
    drop(event) {
        this._html_tag.removeEventListener('mousemove', this._move_func, false)
        if (this._element_dragged === null) {
            return false
        }
        this._clone.remove()
        // if (hasChild(this._options.iframe.document.body, this._element_dragged)) {
        //     if (this._object_dragged.type === 'layout') {
        //         //Store new container in global containers list
        //         this._containers.push(this._element_dragged)
        //     }
        // }
        this._object_dragged = null
        this._element_dragged.classList.remove('half-opacity')
        this._element_dragged = null
        if(this._overlay !== null) {
            this._overlay.remove()
            this._overlay = null
        }
    }
    getDraggable(element, draggable_selector) {
        if (element.matches(draggable_selector)) {
            return element
        } else {
            let tryToFindElem = element.closest(draggable_selector)
            if (tryToFindElem !== null) {
                return tryToFindElem
            } else {
                return null
            }
        }
    }
    createClone(grabbedElem, event) {
        this._clone = grabbedElem.cloneNode(true)
        this._clone.classList.add('clone')
        document.body.appendChild(this._clone)
        this._inner_x = event.clientX - grabbedElem.getBoundingClientRect().left
        this._inner_y = event.clientY - grabbedElem.getBoundingClientRect().top
        this._clone.style.width = `${grabbedElem.getBoundingClientRect().width}px`
        this._clone.style.height = `${grabbedElem.getBoundingClientRect().height}px`
        let xPos, yPos = 0
        xPos = event.clientX - this._inner_x
        yPos = event.clientY - this._inner_y
        this._clone.style.left = `${xPos}px`
        this._clone.style.top = `${yPos}px`
        this._move_func = this.move.bind(this) // store reference of new function created (by calling .bind(this)) to removeEventListener in drop function
        this._html_tag.addEventListener('mousemove', this._move_func, false)
    }
    renderShadowElem(event) {
        let elements_behind_cursor = document.elementsFromPoint(event.clientX, event.clientY)
        if (selectorMatchFound(elements_behind_cursor, '#iframe')) {
            //Determine dragged element type
            switch (this._object_dragged.type) {
                case 'layout':
                    this._element_dragged.classList.add('half-opacity', 'layout')
                    let closest_layout = closestDescendantLayout(event.layerY, this._containers)
                    if (!hasChild(this._options.iframe.document.body, this._element_dragged)) { //if element is already rendered skip
                        //Determine layout type
                        switch (layoutType(this._element_dragged)) {
                            case 'grid':
                                let cols = countGridCols(this._element_dragged)
                                let rows = countGridRows(this._element_dragged)
                                let total_places_in_grid = ((cols !== 0) ? cols : 1) * ((rows !== 0) ? rows : 1)
                                let elements_in_grid = countChildren(this._element_dragged) //minus 1 because shadow element has not yet been
                                let number_of_placeholders_to_append = total_places_in_grid - elements_in_grid
                                if (number_of_placeholders_to_append > 0) {
                                    appendPlaceholder('div', this._element_dragged, number_of_placeholders_to_append, 'grid-placeholder')
                                }
                            break;
                            case 'flex':
                                appendPlaceholder('div', this._element_dragged, 2, ['flex-1', 'empty-flex-col'])
                            break;
                            case 'container':
                            break;
                            default:
                                console.log("unrecognized layout type")
                        }
                    }
                    if (typeof closest_layout !== 'undefined') {
                        this._options.iframe.document.body.insertBefore(this._element_dragged, closest_layout)
                    } else {
                        this._options.iframe.document.body.appendChild(this._element_dragged)
                    }
                break;
                case 'element':
                    this._element_dragged.classList.add('half-opacity')
                    let elements_behind_cursor_in_iframe = this._options.iframe.document.elementsFromPoint(event.layerX, event.layerY)
                    let layout_hovered = findFirstChildMatching(elements_behind_cursor_in_iframe, '.layout')
                    if (typeof layout_hovered !== 'undefined') {
                        //Check if we changed layout hovered to reappend placeholder to grid we just left eventually
                        if (this._last_layout_hovered !== layout_hovered) {
                            if (this._last_layout_hovered !== null && layoutType(this._last_layout_hovered) === 'grid') {
                                let placeholder = createGridPlaceholder()
                                this._element_dragged.replaceWith(placeholder)
                            }
                        }
                        switch (layoutType(layout_hovered)) {
                            case 'grid':
                                this._last_layout_hovered = layout_hovered
                                this.appendGridShadowElement(elements_behind_cursor_in_iframe)
                            break;
                            case 'flex':
                                this._last_layout_hovered = layout_hovered
                                let flex_col_hovered = findFirstChildMatching(elements_behind_cursor_in_iframe, "div[class^='flex-']")
                                if (typeof flex_col_hovered !== 'undefined') {
                                    flex_col_hovered.appendChild(this._element_dragged)
                                }
                            break;
                            case 'container':
                                this._last_layout_hovered = layout_hovered
                                layout_hovered.appendChild(this._element_dragged)
                            break;
                            default:
                                console.log("unrecognized hovered layout type")
                        }
                    } else { // Not over a layout
                        if (this._last_layout_hovered !== null && layoutType(this._last_layout_hovered) === 'grid') {
                            let placeholder = createGridPlaceholder()
                            this._element_dragged.replaceWith(placeholder)
                        } else {
                            this._element_dragged.remove()
                        }
                    }
                break;
                default:
                    console.log("unrecognized dragged object")
            }
        } else {
            if (this._last_layout_hovered !== null && layoutType(this._last_layout_hovered) === 'grid') {
                let placeholder = createGridPlaceholder()
                this._element_dragged.replaceWith(placeholder)
            } else {
                this._element_dragged.remove()
            }
        }// Not over iframe
    }
    shadowElementAlreadyRendered(element) {
        return this._options.iframe.document.body.contains(element)
    }
    getBlockFromId(id) {
        return this._options.templates.find((template) => {
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
    appendGridShadowElement(elements_behind_cursor_in_iframe) {
        let placeholder_hovered = findFirstChildMatching(elements_behind_cursor_in_iframe, '.grid-placeholder')
        if (placeholder_hovered !== this._current_placeholder_hovered && !elements_behind_cursor_in_iframe.includes(this._element_dragged)) { // changed placeholder hovered
            let placeholder = createGridPlaceholder()
            this._element_dragged.replaceWith(placeholder)
            this._current_placeholder_hovered = placeholder_hovered
        }
        if (typeof placeholder_hovered !== 'undefined') {
            placeholder_hovered.replaceWith(this._element_dragged)
        }
    }
}
