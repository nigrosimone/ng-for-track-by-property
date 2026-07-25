// eslint.config.mjs

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    // `examples/` holds standalone apps with their own package.json and tsconfig:
    // they are built on their own, not by this workspace.
    ignores: ['dist/**', 'coverage/**', '.angular/**', 'out-tsc/**', 'examples/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      // a leading underscore marks a parameter kept only to satisfy a signature
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // The directives key a list of anything by one of its properties, so the item
    // type is genuinely unconstrained.
    files: ['projects/ng-for-track-by-property/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'ng', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'ng', style: 'kebab-case' },
      ],
    },
  },
  {
    files: ['projects/ng-for-track-by-property-demo/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  {
    // Test components are declared inline and deliberately break the naming rules.
    files: ['**/*.spec.ts'],
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended],
    rules: {
      // This library exists to give `*ngFor` a trackBy. Telling it to use `@for`
      // instead would leave nothing to test or demonstrate — `@for` has its own
      // mandatory `track`, which is precisely why the two do not overlap.
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
  // Must stay last: turns off every rule that conflicts with Prettier.
  prettier,
);
