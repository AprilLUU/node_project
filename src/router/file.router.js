const Router = require("koa-router")
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require("../middleware/file.middleware")
const { verifyAuth } = require("../middleware/auth.middleware")
const {
  saveAvatarInfo,
  savePictureInfo
} = require("../controller/file.controller")

const router = new Router({ prefix: "/upload" })

router.post("/avatar", verifyAuth, avatarHandler, saveAvatarInfo)
router.post(
  "/picture",
  verifyAuth,
  pictureHandler,
  pictureResize,
  savePictureInfo
)

module.exports = router
