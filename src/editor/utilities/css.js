export function replaceClass(element, new_class, pattern) {
  if (pattern !== null) {
    let regex = new RegExp(pattern, 'g')
    let class_array = [...element.element.classList.values()]
    let match = class_array.find((item) => {
      return regex.test(item)
    })
    if (match !== null) {
      element.removeClass(match)
    }
  }
  element.addClass(new_class)
},
