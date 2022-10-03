module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/base',
    // Vue 3 Config
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    // Vue 2 Config, Not the desired one, we want to enforce vue 3 usage.
    // 'plugin:vue/essential',
    // 'plugin:vue/strongly-recommended',
    // 'plugin:vue/recommended',
    'prettier'
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off'
  }
}
