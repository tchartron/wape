export function countRows(element) {
    let classList = element.className.split(' ')
    let rowsAmount = 0
    if (classList.includes('grid')) {
        let rowsClass = classList.find((elem) => {
            return (elem.match(/grid-rows-([0-9])/) !== null)
        })
        if (typeof rowsClass !== 'undefined') {
            let matchRows = rowsClass.match(/grid-rows-([0-9])/)
            if (matchRows !== null) {
                rowsAmount = matchRows[1]
            }
        }
    }
    return parseInt(rowsAmount)
}
export function countCols(element) {
    let classList = element.className.split(' ')
    let colsAmount = 0
    if (classList.includes('grid')) {
        let colsClass = classList.find((elem) => {
            return (elem.match(/grid-cols-([0-9])/) !== null)
        })
        if (typeof colsClass !== 'undefined') {
            let matchCols = colsClass.match(/grid-cols-([0-9])/)
            if (matchCols !== null) {
                colsAmount = matchCols[1]
            }
        }
    }
    return parseInt(colsAmount)
}

export function  createPlaceholder() {
    let placeholder = document.createElement('div');
    placeholder.classList.add('grid-placeholder')
    return placeholder
}
