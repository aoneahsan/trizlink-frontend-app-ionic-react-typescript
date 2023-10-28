module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  },
  // uncomment this and it will show the errors in project
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  // extends: [],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // Rules set by ahsan which are meant to be like this until changed by ahsan due to some reason in future
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': 'off', // keep this off as it's useless

    // rules disabled for now
    eqeqeq: 'off',
    curly: 'off',
    'no-new': 'off',
    'no-tabs': 'off',
    'no-void': 'off',
    'no-empty': 'off',
    'eol-last': 'off',
    'import/first': 'off',
    'react/jsx-key': 'off',
    'no-undef-init': 'off', // need to turn this on
    'spaced-comment': 'off',
    'object-shorthand': 'off',
    'react/prop-types': 'off',
    'multiline-ternary': 'off',
    'react/display-name': 'off',
    'no-trailing-spaces': 'off',
    'operator-linebreak': 'off',
    'promise/param-names': 'off',
    'no-unneeded-ternary': 'off',
    'import/no-duplicates': 'off',
    'n/handle-callback-err': 'off',
    'array-callback-return': 'off',
    'prefer-regex-literals': 'off',
    'react/no-children-prop': 'off',
    '@typescript-eslint/semi': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/indent': 'off',
    'react/no-unknown-property': 'off',
    '@typescript-eslint/quotes': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // need to turn this on
    '@typescript-eslint/prefer-includes': 'off',
    '@typescript-eslint/naming-convention': 'off', // need to turn this on
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/consistent-type-imports': 'off', // need to turn this on
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off', // need to turn this on
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off' // need to turn this on
  }
};
