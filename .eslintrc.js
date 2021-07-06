module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    // 'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  plugins: ['react', 'prettier', '@typescript-eslint', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {},
      react: {
        version: 'detect',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
      },
    ],
    'import/extensions': 'off',
  },
};
