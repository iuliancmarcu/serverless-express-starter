module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'no-unused-vars': 'off', 
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { 
        'vars': 'all', 
        'varsIgnorePattern': '^_', 
        'args': 'after-used', 
        'argsIgnorePattern': '^_' 
      }
    ],

    'import/order': [
      'error', 
      {
        'newlines-between': 'always'
      }
    ],
    'import/newline-after-import': 'error',

    'prettier/prettier': [
      'error', 
      {
        'singleQuote': true,
        'trailingComma': 'all',
        'tabWidth': 2,
        'useTabs': false,
        'printWidth': 120,
      }
    ],
  },
};
