const Router = require("koa-router")
const { create, detail, avatarInfo } = require("../controller/user.controller")
const { verifyAuth } = require("../middleware/auth.middleware")
const { verifyUser, handlePassword } = require("../middleware/user.middleware")

const router = new Router({ prefix: "/user" })

router.post("/", verifyUser, handlePassword, create)
router.get("/", verifyAuth, detail)
router.get("/:userId/avatar", avatarInfo)

module.exports = router
