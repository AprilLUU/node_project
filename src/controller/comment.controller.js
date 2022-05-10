const responseWithErrorHandle = require("../utils/respone-with-err-handle")
const serviceMap = require("./service.map")

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    await responseWithErrorHandle({
      ctx,
      serviceName: serviceMap.comment.serviceName,
      ...serviceMap.comment.create,
      args: [momentId, content, id]
    })
  }

  async reply(ctx, next) {
    const { commentId } = ctx.request.params
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    await responseWithErrorHandle({
      ctx,
      serviceName: serviceMap.comment.serviceName,
      ...serviceMap.comment.reply,
      args: [momentId, content, id, commentId]
    })
  }

  async update(ctx, next) {
    const { commentId } = ctx.request.params
    const { content } = ctx.request.body
    await responseWithErrorHandle({
      ctx,
      serviceName: serviceMap.comment.serviceName,
      ...serviceMap.comment.update,
      args: [commentId, content]
    })
  }

  async remove(ctx, next) {
    const { commentId } = ctx.request.params
    await responseWithErrorHandle({
      ctx,
      serviceName: serviceMap.comment.serviceName,
      ...serviceMap.comment.remove,
      args: [commentId]
    })
  }

  async list(ctx, next) {
    const { momentId } = ctx.query
    await responseWithErrorHandle({
      ctx,
      serviceName: serviceMap.comment.serviceName,
      ...serviceMap.comment.list,
      args: [momentId]
    })
  }
}

module.exports = new CommentController()
