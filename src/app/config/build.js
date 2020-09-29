const path = require('path')
const pkg = require('./../../../package.json')
const banner =
  '/*\n' +
  ` * ${pkg.name} version ${pkg.version}\n` +
  ` * ${pkg.author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

module.exports = {
    banner: banner
}
