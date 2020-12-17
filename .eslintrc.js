// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': process.env.NODE_ENV === 'production' ? 0 : ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    // allow debugger during development
    'no-debugger': 0, //process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0, //换行风格由git自动改变 不需要eslint关心
    'no-console': 0, // process.env.NODE_ENV === 'production' ? 2 : 0,
    'camelcase': 0,
    'no-nested-ternary': 0,
    'no-extend-native': ['error', { 'exceptions': ['Date'] }],
    'no-bitwise': 0,
    'no-shadow': 0,
    'no-confusing-arrow': 0,
    'space-unary-ops': 0,
    'no-useless-escape': 0,
    'newline-per-chained-call': 0,
    "no-param-reassign": 0,
    "prefer-spread": 0,
    "prefer-rest-params":0,
    'prefer-template': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
    'object-shorthand': 0,
    'max-len': 0,
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-mixed-operators': ['error', { 'allowSamePrecedence': true }],
    'yoda': ["error", "never", { "exceptRange": true }],
    'global-require': 0,
    'import/no-dynamic-require': 0,
  }
}
