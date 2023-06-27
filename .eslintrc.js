/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 'latest',
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    env: {
        "browser": true,
        "es2021": true,
        "node": true,
        'vue/setup-compiler-macros': true,
    }
}
