module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    quotes: ['error', 'single'],
    'react/react-in-jsx-scope': 'off', // Desnecessário com React 17+
    'react/prop-types': 'off', // Não necessário com TypeScript
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
