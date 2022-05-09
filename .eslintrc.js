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
    indent: ["error", 2],
    // 换行
    "linebreak-style": ["error", "unix"],
    // 单引号或者双引号
    quotes: ["error", "double"],
    // 分号
    semi: ["error", "never"]
  }
}
