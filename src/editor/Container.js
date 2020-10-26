export default class Container {
    constructor(id, title, icon, droppable, content) {
        this._id = id //int unique
        this._title = title //title shown in leftmenu
        this._icon = icon //icon shown in leftmenu
        this._droppable = droppable //bool droppable or not (containers are droppable, elements are not)
        this._content = content //string html content
    }
    get id() {
        return this._id
    }
    get title() {
        return this._title
    }
    get icon() {
        return this._icon
    }
    get droppable() {
        return this._droppable
    }
    get content() {
        return this._content
    }

    set id(id) {
        this._id = id
    }
    set title(title) {
        this._title = title
    }
    set icon(icon) {
        this._icon = icon
    }
    set droppable(droppable) {
        this._droppable = droppable
    }
    set content(content) {
        this._content = content
    }
}
