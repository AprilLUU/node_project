const Router = require("koa-router")
const { login, success } = require("../controller/auth.controller")
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware")

const router = new Router()

router.post("/login", verifyLogin, login)
router.get("/auth", verifyAuth, success)

module.exports = router
