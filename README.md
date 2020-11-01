# Wape
Web Application Page Editor

## Roadmap
- [X] Use Bulma in iframe
- [X] Mitt event emmiter to remove $on
- [X] Don't rely on fontawesome cdn but serve it from here
- [X] Do not use templates.js
- [X] Make editor layouts (containers, layouts (DROPPABLE TARGETS))
- [X] Make editor elements (html elements (no forms elements for now))
- [X] Change bulma for utility framework and extend it for the editor use (tailwindcss)
- [X] Make the cloned element visible and with an opacity of .5 place it where it would be dropped if mouse is released
- [X] Make responsive previews
- [ ] Add support for custom CSS in editor (allow adding classes to elements once custom css is loaded in iframe)
- [ ] Make settings customisation for components and elements (html attributes mostly (id / class / ...)) => Depends on component/element (img ≠ div)
- [ ] Refactor a lot dragger class and especially RenderShadowElement function which is a big mess (+100 lines)
- [ ] Review and maybe change the layouts.js / elements.js organization for clarity
- [ ] Make style customisation for components and elements (css properties like display / borders / bg colors / text color / font size, weight, family / text alignment / line height, letter spacing, margin for blocks / padding for blocks / ...) => Depends on component/element (img ≠ div) maybe generate a combination of corresponding css classes to add to the element while customizing it (tailwind would be good for this)
- [ ] Undo / Redo action
- [ ] Make structure of the page view (maybe switch to it when dragging something in the page)
- [ ] Make code exporting (full page or body only)
- [ ] Make save options (Paying option to host final template in a personnal library provided by an API)
- [ ] Ability to save parts of a template (like grouping elements)
- [ ] Jest testing
