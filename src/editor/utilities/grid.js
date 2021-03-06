import { replaceClass } from 'Editor/utilities/css'

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

export function createElementAndAppend(elementType, container, numberToAppend, classToAdd = '') {
  for (let i = 0; i < numberToAppend; i++) {
      let div = document.createElement(elementType);
      if (classToAdd !== '') {
          div.classList.add(classToAdd)
      }
      container.appendChild(div)
  }
}

export function addColumn(container_instance) {
    if (container_instance !== null) {
         else if (typeToAdd === 'col') {
            container_instance.cols++
            replaceClass(container_instance, `grid-cols-${container_instance.cols}`, this.mappers.grid_mapper.cols.template.regex_pattern)
            let totalPlacesInGrid = ((container_instance.cols !== 0) ? container_instance.cols : 1) * ((container_instance.cols !== 0) ? container_instance.cols : 1)
            let elementsInGrid = container_instance.element.children.length
            let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
            if (numberOfPlaceholdersToAppend > 0) {
                createElementAndAppend('div', container_instance.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
            }
        }
    }
}

export function addRow(container_instance) {
    container_instance.rows++
    replaceClass(container_instance, `grid-rows-${container_instance.rows}`, this.mappers.grid_mapper.rows.template.regex_pattern)
    let totalPlacesInGrid = ((container_instance.cols !== 0) ? container_instance.cols : 1) * ((container_instance.rows !== 0) ? container_instance.rows : 1)
    let elementsInGrid = container_instance.element.children.length
    let numberOfPlaceholdersToAppend = totalPlacesInGrid - elementsInGrid
    if (numberOfPlaceholdersToAppend > 0) {
        createElementAndAppend('div', container_instance.element, numberOfPlaceholdersToAppend, 'grid-placeholder')
    }
}
