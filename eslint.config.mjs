import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import { parser } from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import { fixupPluginRules } from '@eslint/compat';
import checkfilePlugin from 'eslint-plugin-check-file';

const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
      import: fixupPluginRules(importPlugin),
      'check-file': checkfilePlugin,
    },
    rules: {
      // Rules from @eslint/js recommended config
      ...pluginJs.configs.recommended.rules,

      // Rules from @typescript-eslint/recommended config
      ...tseslint.configs.recommended.rules,

      // Custom rules
      // 'import/no-restricted-paths': [
      //   'error',
      //   {
      //     zones: [],
      //   },
      // ],
      // 'check-file/filename-naming-convention': [
      //   'error',
      //   {
      //     '**/*.{ts,tsx}': 'KEBAB_CASE',
      //   },
      //   {
      //     ignoreMiddleExtensions: true,
      //   },
      // ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!(__tests__)': 'KEBAB_CASE',
        },
      ],

      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'build',
      'public',
      '*.test.*',
      '*.spec.*',
    ],
  },
];

export default config;
