const jwt = require("jsonwebtoken")

const errorType = require("../constants/error-type")
const service = require("../service/user.service")
const md5password = require("../utils/password-handle")
const config = require("../app/config")

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!name || !password) {
    const err = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED0)
    ctx.app.emit("error", err, ctx)
    return
  }
  // 判断用户是否存在
  const res = await service.getUserByName(name)
  const user = res[0]
  if (!user) {
    const err = new Error(errorType.USER_DOES_NOT_EXISTS)
    ctx.app.emit("error", err, ctx)
    return
  }

  // 验证密码是否正确
  if (md5password(password) !== user.password) {
    const err = new Error(errorType.PASSWORD_IS_INCORRENT)
    ctx.app.emit("error", err, ctx)
    return
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  const token = authorization.replace("Bearer ", "")

  try {
    const res = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ["RS256"]
    })

    await next()
  } catch(error) {
    const err = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit("error", err, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
