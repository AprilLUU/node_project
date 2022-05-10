const Router = require("koa-router")
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")
const { create, detail, list, update, remove } = require("../controller/moment.controller")

const router = new Router({ prefix: "/moment" })

router.post("/", verifyAuth, create)
router.get("/", list)
router.get("/:momentId", detail)
router.patch("/:momentId", verifyAuth, verifyPermission, update)
router.delete("/:momentId", verifyAuth, verifyPermission, remove)

module.exports = router
