export function containerType(element) {
    if (element.matches('.grid')) {
        return 'grid'
    }
    if (element.matches('.flex')) {
        return 'flex'
    }
    return 'container'
}
