// import debounce from 'lodash/debounce';
// import Drag from 'Editor/Drag'
// import Drop from 'Editor/Drop'

export default class Iframe {
    constructor(id) {
        // this.id = id
        this.window = document.querySelector(id).contentWindow
        this.document = document.querySelector(id).contentDocument
        // this.drag = Object //Drag.js object instantiated in LeftMenu and passed through event bus to MainPanel
        // this.drop = Object
    }
    // setDrag(drag) {
    //     this.drag = drag
    // }
    // setDrop(drop) {
    //     this.drop = drop
    // }
    // buildDomElement() { // Credits => gomakethings.com
    //     if (!this.window.DOMParser) {
    //         return false
    //     }
    //     let parser = new DOMParser();
    //     try {
    //         parser.parseFromString('x', 'text/html');
    //     } catch(err) {
    //         return false
    //     }
    //     return true
    // }
    // append(elem) {
    //     if (this.buildDomElement()) {
    //         let parser = new DOMParser();
    //         let doc = parser.parseFromString(elem.content, 'text/html');
    //         this.draggedDomElem = doc.body.firstChild
    //         console.log(this.draggedDomElem)
            // this.drop.append(elem)
        // } else {
        //     console.log('Browser not supported')
        // }
    // }
    // handleDrag() {
    //     this.renderDropPreview()
    // }
    // renderDropPreview() {
    //     //Works but this.draggedDomElem needs to be defined before !!!!
    //     let clone = this.draggedDomElem.cloneNode(true)
    //     console.log(clone)
    // }
}
