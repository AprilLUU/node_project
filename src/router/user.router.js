const Router = require("koa-router")
const { create } = require("../controller/user.controller")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")

const router = new Router({ prefix: "/user" })

router.post("/", verifyUser, handlePassword, create)

module.exports = router
