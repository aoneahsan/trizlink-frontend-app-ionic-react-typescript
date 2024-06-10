module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module'
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*' // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': 0,
    'object-curly-spacing': 'off',
    quotes: 0,
    indent: 0,
    'no-tabs': 'off',
    'linebreak-style': 0,

    // The following rules are being disabled because they are not compatible with the Google style guide.
    semi: 'off',
    'quote-props': 'off',
    '@typescript-eslint/semi': 'off',
    'no-new': 'off',
    'max-len': 'off',
    'comma-dangle': 'off',
    'valid-jsdoc': 'off',
    'new-cap': 'off',
    'arrow-parens': 'off'
  }
};
