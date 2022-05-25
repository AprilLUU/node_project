const Router = require("koa-router")
const {
  verifyAuth,
  verifyPermission
} = require("../middleware/auth.middleware")
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require("../controller/moment.controller")
const { verifyLabelIsExists } = require("../middleware/label.middleware")

const router = new Router({ prefix: "/moment" })

router.post("/", verifyAuth, create)
router.get("/", list)
router.get("/:momentId", detail)
router.patch("/:momentId", verifyAuth, verifyPermission, update)
router.delete("/:momentId", verifyAuth, verifyPermission, remove)
router.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelIsExists,
  addLabels
)
router.get("/images/:filename", fileInfo)

module.exports = router
