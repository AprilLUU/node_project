const Router = require("koa-router")
const {
  verifyAuth,
  verifyPermission
} = require("../middleware/auth.middleware")
const {
  create,
  reply,
  update,
  remove,
  list
} = require("../controller/comment.controller")

const router = new Router({ prefix: "/comment" })

router.get("/", list)
router.post("/", verifyAuth, create)
router.post("/:commentId/reply", verifyAuth, reply)
router.patch("/:commentId", verifyAuth, verifyPermission, update)
router.delete("/:commentId", verifyAuth, verifyPermission, remove)

module.exports = router
