const responseWithErrHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")
const momentService = require("../service/moment.service")
const emitErr = require("../utils/emit-err")
const errorType = require("../constants/error-type")

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

  async addLabels(ctx, next) {
    const { labels } = ctx.request.body
    const { momentId } = ctx.request.params
    for (let label of labels) {
      try {
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          try {
            await momentService.addLabel(momentId, label.id)
          } catch(error) {
            ctx.errorMsg = "添加标签失败~"
            emitErr(ctx, errorType.RESPONSE_ERROR)
          }
        }
      } catch(error) {
        emitErr(ctx, errorType.QUERY_ERROR)
      }
    }

    ctx.body = "添加标签成功~"
  }
}

module.exports = new MomentController()
