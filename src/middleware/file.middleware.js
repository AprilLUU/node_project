const path = require("path")
const multer = require("koa-multer")
const jimp = require("jimp")
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path")

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

const avatarUpload = multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single("avatar")

const pictureUpload = multer({
  dest: PICTURE_PATH
})

const pictureHandler = pictureUpload.array("picture", 9)

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files

  for (const file of files) {
    const destPath = path.join(file.destination, file.filename)

    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(`${destPath}--large`)
      image.resize(640, jimp.AUTO).write(`${destPath}--middle`)
      image.resize(320, jimp.AUTO).write(`${destPath}--small`)
    })
  }

  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
