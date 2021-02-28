export default [
    {
        id: 1,
        title: 'Section',
        icon: 'far fa-square',
        type: 'layout',
        content: `<div class="container mx-auto"></div>`
    },
    {
        id: 2,
        title: 'Container',
        icon: 'far fa-square',
        type: 'layout',
        content: `<div class="container px-10 mx-auto"></div>`
    },
    {
        id: 3,
        title: 'Columns',
        icon: 'fas fa-columns',
        type: 'layout',
        content: `<div class="flex flex-row flex-wrap">
                    <div class="flex-1"></div>
                    <div class="flex-1"></div>
                </div>`
    },
    {
        id: 4,
        title: 'Grid',
        icon: 'fas fa-border-all',
        type: 'layout',
        content: `<div class="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-2"></div>`
    },
]
