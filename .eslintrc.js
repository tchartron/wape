module.exports = {
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/recommended'
    ],
    rules: {
        strict: 'off',
        quotes: ['warn', 'single', { 'allowTemplateLiterals': true }]
    }
}
