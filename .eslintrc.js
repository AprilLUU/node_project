module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    // 缩进 2个空格
    indent: ["error", 2, { SwitchCase: 1 }],
    // 换行
    "linebreak-style": ["error", "unix"],
    // 单引号或者双引号
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    // 分号
    semi: ["error", "never"],
    "no-undef": "off",
    "no-unused-vars": "off"
  }
}
