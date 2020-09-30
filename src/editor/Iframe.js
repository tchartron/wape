export default class Iframe {
    constructor(id, container) {
        this.id = id
        //context
        this.window = document.querySelector(id).contentWindow
        this.document = document.querySelector(id).contentDocument
        this.mainContainer = this.document.querySelector(container)
        this.elemDomString = Object
    }
    bindEvents() {
        this.document.body.addEventListener('dragenter', event => {
            console.log('dragenter')
        })
        this.document.body.addEventListener('dragover', event => {
            event.preventDefault()
            console.log('dragover')
        })
        this.document.body.addEventListener('drop', event => {
            console.log('drop')
            this.append(this.elemDomString)
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
            let doc = parser.parseFromString(elem, 'text/html');
            console.log(doc.body)
            this.mainContainer.appendChild(doc.body.firstChild)
        } else {
            console.log('Browser not supported')
        }
    }
}
