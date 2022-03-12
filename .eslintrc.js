module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
