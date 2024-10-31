import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends('airbnb-base', 'prettier'),
  {
    ignores: [
      'jest.config.mjs', // игнорируем файл
    ],
    rules: {
      quotes: ['error', 'single'], // Использовать одинарные кавычки
      'operator-linebreak': [
        'error',
        'before',
        { overrides: { '&&': 'before' } },
      ],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'import/extensions': [
        'error',
        {
          js: 'always',
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
      'spaced-comment': [
        'error', // или "warn", чтобы выдавать предупреждения
        'always', // требует пробел после символа комментария
      ],
      'max-len': [
        'error',
        {
          code: 100, // максимальная длина строки
          // comments: 100, // максимальная длина строки для комментариев
          ignoreUrls: true, // игнорировать длину строк для URL
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline', // требовать запятую в конце многострочных массивов
          objects: 'always-multiline', // требовать запятую в конце многострочных объектов
          imports: 'always-multiline', // требовать запятую в конце многострочных импортов
          exports: 'always-multiline', // требовать запятую в конце многострочных экспортов
          functions: 'ignore', // игнорировать для функций
        },
      ],
      'no-confusing-arrow': [
        'error',
        { allowParens: true }, // запрещает путаницу при использовании стрелочных функций
      ],
      'implicit-arrow-linebreak': [
        'error',
        'beside', // требует, чтобы стрелочная функция была на одной строке с ее выражением
      ],
    },
  },
];
