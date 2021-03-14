import Layout from 'Editor/classes/layouts/Layout'
import { countCols } from 'Editor/utilities/flex'

export default class Flex extends Layout {
    constructor(element, type) {
        super(element, type)
        this.cols = countCols(element)
    }

    addColumn() {
        let default_column = document.createElement('div')
        default_column.classList.add('flex-1', 'empty-flex-col')
        this.element.append(default_column)
    }
}
