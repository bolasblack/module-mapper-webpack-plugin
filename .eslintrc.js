module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    './node_modules/@c4605/toolconfs/eslintrc.base',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // off
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    // error
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true },
    ],
  },
}
