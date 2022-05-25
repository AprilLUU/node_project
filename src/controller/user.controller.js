const fs = require("fs")

const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")
const fileService = require("../service/file.service")
const { AVATAR_PATH } = require("../constants/file-path")

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.user.serviceName,
      ...serviceMap.user.create,
      args: [user]
    })
  }

  async detail(ctx, next) {
    const { id } = ctx.user
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.user.serviceName,
      ...serviceMap.user.detail,
      args: [id]
    })
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatar = await fileService.getAvatarByUserId(userId)
    ctx.response.set("content-type", avatar.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatar.filename}`)
  }
}

module.exports = new UserController()
