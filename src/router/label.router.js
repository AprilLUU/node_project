const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")
const { create } = require("../controller/label.controller")

const router = new Router({ prefix: "/label" })

router.post("/", verifyAuth, create)

module.exports = router


