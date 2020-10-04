const path = require('path')
const pkg = require('./../../../package.json')
const banner =
  '/*\n' +
  ` * ${pkg.name} version ${pkg.version}\n` +
  ` * ${pkg.author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

module.exports = {
    banner: banner,
    maincss: 'src/app/styles/main.css',
    fontawesome: 'https://kit.fontawesome.com/b71e068415.js',
}
