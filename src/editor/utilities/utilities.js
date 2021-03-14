export function hasClass(element, css_class) {
    return (element.matches(`.${css_class}`))
}

export function findFirstChildMatching(elements, css_selector) {
    return elements.find((elem) => {
        return (elem.matches(css_selector))
    })
}

export function selectorMatchFound(elements, css_selector) {
    return elements.some((elem) => {
        return (elem.matches(css_selector))
    })
}

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
}
