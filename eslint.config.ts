import js from '@eslint/js';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import type {Linter} from 'eslint';
import globals from 'globals';

const TS_FILES = ['**/*.{ts,tsx}'];

/** Scopes shared configs to TypeScript files. */
function forTypeScript(configs: Linter.Config[]) {
  return configs.map((config) => ({...config, files: TS_FILES}));
}

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/build/',
      '**/dist/',
      '**/*.graphql.d.ts',
      '**/*.graphql.ts',
      '**/*.generated.d.ts',
      '**/.react-router/',
    ],
  },
  js.configs.recommended,
  eslintComments.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        {name: 'Link', linkAttribute: 'to'},
        {name: 'NavLink', linkAttribute: 'to'},
      ],
    },
    rules: {
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      curly: ['error', 'all'],
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-use-before-define': 'off',
      'no-warning-comments': 'off',
      'object-shorthand': ['error', 'always', {avoidQuotes: true}],
      'no-useless-escape': 'off',
      'no-case-declarations': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/label-has-for': 'off',
      'react/display-name': 'off',
      'react/no-array-index-key': 'warn',
      'react/prop-types': 'off',
    },
  },
  ...forTypeScript([
    ...(typescriptEslint.configs['flat/recommended'] as Linter.Config[]),
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ]),
  {
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {selector: 'typeLike', format: ['PascalCase']},
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
        {selector: 'interface', format: ['PascalCase']},
        {selector: 'property', format: null},
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'jsx-a11y/click-events-have-key-events': 'off',
      '@stylistic/curly-newline': ['error', 'always'],
      '@stylistic/jsx-curly-newline': 'error',
      '@stylistic/brace-style': 'error',
    },
  },
  {
    ...jest.configs['flat/recommended'],
    files: ['**/*.test.*'],
  },
  {
    files: ['**/*.server.*'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
] satisfies Linter.Config[];
