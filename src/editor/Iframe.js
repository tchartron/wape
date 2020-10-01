import debounce from 'lodash/debounce';

export default class Iframe {
    constructor(id, container) {
        this.id = id
        this.window = document.querySelector(id).contentWindow
        this.document = document.querySelector(id).contentDocument
        this.mainContainer = this.document.querySelector(container)
        this.draggedElem = Object
        this.debouncedHandleDrag = debounce(this.handleDrag, 300, { maxWait: 500 })
    }
    bindEvents() {
        this.mainContainer.addEventListener('dragenter', event => {
            console.log('dragenter')
        })
        this.mainContainer.addEventListener('dragover', (event) => {
            event.preventDefault()
            this.debouncedHandleDrag()
        })
        this.mainContainer.addEventListener('drop', event => {
            console.log('drop')
            this.append(this.draggedElem)
        })
    }
    supportDomParser() { // Credits => gomakethings.com
        if (!this.window.DOMParser) {
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
    append(elem) {
        if (this.supportDomParser()) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(elem.content, 'text/html');
            this.mainContainer.appendChild(doc.body.firstChild)
        } else {
            console.log('Browser not supported')
        }
    }
    handleDrag() {
        console.log('handleDrag')
    }
}
