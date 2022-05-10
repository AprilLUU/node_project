const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")

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
}

module.exports = new UserController()
