module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // extends: ['eslint:recommended', 'plugin:react/jsx-runtime'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // 'react/react-in-jsx-scope': 'off',
  },
};
