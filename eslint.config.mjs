import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'no-console': 'off', // allow console.log in TypeScript files
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
