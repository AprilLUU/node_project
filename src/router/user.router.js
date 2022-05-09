const Router = require("koa-router")
const {
  create
} = require("../controller/user.controller")

const router = new Router({ prefix: "/users" })

router.post("/", create)

module.exports = router