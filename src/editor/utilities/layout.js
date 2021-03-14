export function layoutType(element) {
    // console.log(element)
    if (element.matches('.grid')) {
        return 'grid'
    }
    if (element.matches('.flex')) {
        return 'flex'
    }
    if (element.matches('.container')) {
        return 'container'
    }
    return null
}

export function appendPlaceholder(element_type, container, number_to_append, class_to_add = '') {
  for (let i = 0; i < number_to_append; i++) {
      let div = document.createElement(element_type);
      if (class_to_add !== '') {
        if (Array.isArray(class_to_add)) {
            for (let css_class of class_to_add) {
                div.classList.add(css_class)
            }
        } else {
          div.classList.add(class_to_add)
        }
      }
      container.appendChild(div)
  }
}

export function countChildren(element) {
    return element.children.length
}

export function closestDescendantLayout(y, layouts) {
    if (layouts.length > 0) {
        return layouts.find((layout) => {
            return (layout.getBoundingClientRect().bottom >= y)
        })
    }
}

export function hasChild(layout, element) {
    return layout.contains(element)
}
