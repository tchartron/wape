# Wape
Web Application Page Editor

## Roadmap
- [X] Use Bulma in iframe
- [X] Mitt event emmiter to remove $on
- [X] Don't rely on fontawesome cdn but serve it from here
- [ ] Add support for custom CSS in editor
- [ ] Do not use templates.js
- [ ] Make editor components (containers, layouts (DROPPABLE TARGETS))
- [ ] Make editor elements (html elements (no forms elements for now))
- [ ] Have to define what is droppable in what
- [ ] Change bulma for utility framework and extend it for the editor use
- [ ] Make the clone element visible and with an opacity of .5 place it where it would be dropped if mouse is released
- [ ] Make settings customisation for components and elements (html attributes mostly (id / class / ...)) => Depends on component/element (img ≠ div)
- [ ] Make style customisation for components and elements (css properties like display / borders / bg colors / text color / font size, weight, family / text alignment / line height, letter spacing, margin for blocks / padding for blocks / ...) => Depends on component/element (img ≠ div) maybe generate a combination of corresponding css classes to add to the element while customizing it (tailwind would be good for this)
- [ ] Make responsive previews
- [ ] Undo / Redo action
- [ ] Make something to help with drag dropping containers (and maybe elements) like exploding with a little margin between them (and maybe little shaking effect) to help see where we can drop new container/element
- [ ] Make structure of the page view (maybe switch to it when dragging something in the page)
- [ ] Make code exporting (full page or body only)
- [ ] Make save options (maybe paying option to host final template in a personnal library provided by an API ?)
- [ ] Ability to save parts of a template (like grouping elements => will need an api to save these ?)
- [ ] Jest testing
