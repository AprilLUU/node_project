const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")

class MomentController {
  async create(ctx, next) {
    // userId
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // 插入数据到数据库中
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.moment.serviceName,
      ...serviceMap.moment.create,
      args: [userId, content]
    })
  }

  async detail(ctx, next) {
    const momentId = ctx.request.params.momentId
    // 查询数据
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.moment.serviceName,
      ...serviceMap.moment.detail,
      args: [momentId]
    })
  }

  async list(ctx, next) {
    const { limit, offset } = ctx.request.query
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.moment.serviceName,
      ...serviceMap.moment.list,
      args: [limit, offset]
    })
  }

  async update(ctx, next) {
    const { momentId } = ctx.request.params
    const { content } = ctx.request.body
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.moment.serviceName,
      ...serviceMap.moment.update,
      args: [momentId, content]
    })
  }

  async remove(ctx, next) {
    const { momentId } = ctx.request.params
    await responseWithErrHandle({
      ctx,
      serviceName: serviceMap.moment.serviceName,
      ...serviceMap.moment.remove,
      args: [momentId]
    })
  }
}

module.exports = new MomentController()
