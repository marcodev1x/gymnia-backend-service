// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['dist', 'build', 'node_modules'],

        rules: {
            // ========== FORMATAÇÃO E ESTILO ==========

            // Linhas e espaçamento
            'max-len': ['warn', { code: 120 }],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'eol-last': ['error', 'always'],
            'no-trailing-spaces': 'error',

            // Indentação e chaves
            'indent': ['error', 4],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],

            // Aspas e ponto-vírgula
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],

            // Vírgulas e objetos
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', { before: false, after: true }],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],

            // ========== CONSISTÊNCIA ==========

            // Preferências modernas
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'error',
            'prefer-template': 'error',

            // Limpeza básica
            'no-duplicate-imports': 'error',
            'no-console': 'warn',

            // ========== TYPESCRIPT ==========
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
