const jwt = require("jsonwebtoken")
const config = require("../app/config")

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, config.PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: "RS256"
    })

    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = "授权成功~"
  }
}

module.exports = new AuthController()
