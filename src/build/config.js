const version = process.env.VERSION || require('../../package.json').version

const banner =
  '/*\n' +
  ` * Webedit version ${version}\n` +
  ` * Thomas Chartron\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export { banner }
