module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
    }
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "no-undef": [2, { "typeof": true }]
  }
}
