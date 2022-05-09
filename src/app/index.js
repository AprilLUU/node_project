const Koa = require("koa")
const bodyParser = require("koa-bodyparser")

const useRoutes = require("../router")
const errorHandler = require("./error-handler")

const app = new Koa()
// 解析body参数，放到request对象的body上
app.use(bodyParser())

// 注册路由
useRoutes(app)

// 监听错误
app.on("error", errorHandler)

module.exports = app
