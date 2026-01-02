import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import * as eslintConfigPrettier from 'eslint-config-prettier'

// Helper to extract default export from namespace imports
function getDefault<T>(mod: { default: T } | T): T {
  return (mod as { default: T }).default ?? (mod as T)
}

export default defineConfig([
  // Base rules
  {
    rules: {
      // off
      'max-classes-per-file': 'off',
      'no-shadow': 'off',
      // error
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'none',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      curly: ['error', 'multi-line'],
    },
  },
  // TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // off
      'no-unused-vars': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      // error
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'none',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
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
  },
  // Prettier (disable conflicting rules)
  getDefault(eslintConfigPrettier),
])
