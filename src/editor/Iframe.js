export default class Iframe {
    constructor(id) {
        this.id = id
        //context
        this.window = document.querySelector(id).contentWindow
        this.document = document.querySelector(id).contentDocument
        // console.log(this)
    }
    bindEvents() {
        let elem = this.document.createElement('div');
        elem.style.cssText = 'width:200px;height:200px;opacity:0.7;background-color:#000';
        this.document.body.appendChild(elem);
        this.document.body.addEventListener('dragenter', event => {
            console.log('dragenter')
        })
        this.document.body.addEventListener('dragenter', event => {
            console.log('dragover')
        })
    }
}
