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
    fontawesomecss: 'src/app/fontawesome/css/all.min.css',
    fontawesomejs: 'src/app/fontawesome/js/all.min.js',
}
