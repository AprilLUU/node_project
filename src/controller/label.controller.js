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
}

module.exports = new LabelController()
