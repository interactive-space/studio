/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  extends: ['@modern-js-app'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist/', 'node_modules/'],
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        'import/no-commonjs': 'off',
      },
    },
  ],
};
