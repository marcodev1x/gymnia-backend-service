// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', 'build', 'node_modules'],
    rules: {
      // Estilo
      'max-len': ['error', { code: 120 }],
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': 'warn',

      // Qualidade de código
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'warn',

      // Import plugins (opcional, se quiser mais controle de imports)
      'import/no-unresolved': 'off',
    }
  }
];
