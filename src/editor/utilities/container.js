export function containerType(element) {
    if (element.matches('.grid')) {
        return 'grid'
    }
    if (element.matches('.flex')) {
        return 'flex'
    }
    return 'container'
}

export function appendPlaceholder(elementType, container, numberToAppend, classToAdd = '') {
  for (let i = 0; i < numberToAppend; i++) {
      let div = document.createElement(elementType);
      if (classToAdd !== '') {
          div.classList.add(classToAdd)
      }
      container.appendChild(div)
  }
}
