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
