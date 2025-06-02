// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  rules: {
    'no-console': 'off',

    '@stylistic/brace-style': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/operator-linebreak': 'off',

    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
  },
})
