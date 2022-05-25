const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")
const userService = require("../service/user.service")
const { APP_HOST, APP_PORT } = require("../app/config")
const errorType = require("../constants/error-type")
const emitErr = require("../utils/emit-err")

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user
    // 保存用户头像地址
    try {
      const avatarURL = `http://${APP_HOST}/${APP_PORT}/user/${id}/avatar`
      await userService.updateAvatarURLById(avatarURL, id)
    } catch(error) {
      ctx.errorMsg = "保存用户头像失败~"
      emitErr(ctx, errorType.RESPONSE_ERROR)
    }

    // 保存用户头像信息
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.file.serviceName,
      ...serviceMap.file.saveAvatarInfo,
      args: [filename, mimetype, size, id]
    })
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query

    for (const file of files) {
      const { filename, mimetype, size } = file
      await responseWithErrHandle({
        ctx,
        serviceName: serviceMap.file.serviceName,
        ...serviceMap.file.savePictureInfo,
        args: [filename, mimetype, size, id, momentId]
      })
    }
  }
}

module.exports = new FileController()
