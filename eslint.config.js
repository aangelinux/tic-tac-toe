import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    rules: {
      'no-unused-vars': ['warn'],
      'no-console': 'off',
      'require-jsdoc': 'off',
    },
  },
])
