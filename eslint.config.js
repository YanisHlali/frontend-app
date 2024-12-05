/** @type {import('eslint').Linter.Config} */
module.exports = {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: require('eslint-plugin-vue'),
    },
    rules: {
      'no-console': ['warn'],  // Assurez-vous que cette règle est correctement définie
      'no-debugger': 'warn',
      'vue/no-unused-vars': 'error',
    },
  };
  