export default class Drop {
    constructor(container) {
        this.container = container
        this.droppable = document.querySelector(this.containerSelector)
        this.iframe = null
    }
    setDocumentContext(iframe) {
        this.iframe = iframe
        this.container = this.iframe.document.querySelector(this.container)
    }
}
