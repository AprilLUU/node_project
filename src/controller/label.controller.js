const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.label.serviceName,
      ...serviceMap.label.create,
      args: [name]
    })
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.request.query
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.label.serviceName,
      ...serviceMap.label.list,
      args: [limit, offset]
    })
  }
}

module.exports = new LabelController()
