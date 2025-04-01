// @ts-nocheck

import eslint from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  {
    ignores: [
      'dist/*',
      // Temporary compiled files
      '**/*.ts.build-*.mjs',

      // JS files at the root of the project
      '*.js',
      '*.cjs',
      '*.mjs',
    ],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // common
      semi: ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'no-unused-vars': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': [2, { before: false, after: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\0'],
            ['^[a-z]', '^[A-Z]'],
            ['^@', '^\\w'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      // prettier
      'prettier/prettier': ['error', { singleQuote: true }],
      // typescript
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      // other
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...react,
    ...reactJsxRuntime,

    languageOptions: {
      ...react.languageOptions,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  prettier,
);
