/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['@modern-js'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist/', 'dist-storybook/'],
  rules: {
    '@typescript-eslint/lines-between-class-members': 'off',
    'node/prefer-global/url': 'off',
    'node/no-unsupported-features/node-builtins': 'off',
  },
};
