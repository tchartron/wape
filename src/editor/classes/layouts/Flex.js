import Layout from 'Editor/classes/layouts/Layout'
import { countCols } from 'Editor/utilities/flex'

export default class Flex extends Layout {
    constructor(element, type) {
        super(element, type)
        this.cols = countCols(element)
    }
}
