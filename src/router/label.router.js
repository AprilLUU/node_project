const Router = require("koa-router")
const { verifyAuth } = require("../middleware/auth.middleware")
const { create, list } = require("../controller/label.controller")

const router = new Router({ prefix: "/label" })

router.post("/", verifyAuth, create)
router.get("/", list)

module.exports = router


