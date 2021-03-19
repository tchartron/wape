import Layout from 'Editor/classes/layouts/Layout'
import { countRows, countCols } from 'Editor/utilities/grid'

export default class Grid extends Layout {
    constructor(element, type) {
        super(element, type)
        this.rows = countRows(this.element)
        this.cols = countCols(this.element)
    }

    deleteRowChildren(row_number) {
        let children_per_row = this.cols
        let first_child_index_to_remove = children_per_row * (row_number - 1)
        let last_child_index_to_remove = first_child_index_to_remove + children_per_row
        let children = [...this.element.children] //Htmlcollection to array
        if (children_per_row > 0) {
            for (let i = first_child_index_to_remove; i < last_child_index_to_remove; i++) {
                children[i].remove()
            }
        }
    }

    deleteColChildren(col_number) {
        let children_per_col = this.rows
        let children_per_row = this.cols
        let first_child_index_to_remove = col_number - 1
        let step = children_per_row
        let last_child_index_to_remove = first_child_index_to_remove + (step * children_per_col)
        let children = [...this.element.children] //Htmlcollection to array
        if (children_per_col > 0) {
            for (let i = first_child_index_to_remove; i < last_child_index_to_remove; i = i + step) {
                children[i].remove()
            }
        }
    }

    totalPlacesInGrid() {
        return ((this.cols !== 0) ? this.cols : 1) * ((this.rows !== 0) ? this.rows : 1)
    }

}
