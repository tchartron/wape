import Layout from 'Editor/classes/layouts/Layout'
import { countRows, countCols } from 'Editor/utilities/grid'

export default class Grid extends Layout {
    constructor(element, type) {
        super(element, type)
        this.rows = countRows(this.element)
        this.cols = countCols(this.element)
    }
}
