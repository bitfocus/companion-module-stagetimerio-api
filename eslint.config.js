import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
      },
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      'indent': ['warn', 2, { 'SwitchCase': 1 }],
      'quotes': ['warn', 'single'],
      'semi': ['warn', 'never'],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-console': 'warn',
      'no-unused-vars': ['warn', { 'args': 'all', 'argsIgnorePattern': '^_' }],
      'no-var': 'warn',
      'no-duplicate-imports': 'warn',
      'no-useless-return': 'warn',
      'space-before-function-paren': ['warn', 'always'],
      'object-curly-spacing': ['warn', 'always'],
      'no-use-before-define': ['error', 'nofunc'],
      'no-unused-expressions': 'error',
    },
  },
]
