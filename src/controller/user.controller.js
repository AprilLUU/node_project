const service = require("../service/user.service")

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    service.create(user)
    ctx.body = "create user success"
  }
}

module.exports = new UserController()