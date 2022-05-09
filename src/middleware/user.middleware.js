const errorType = require("../constants/error-type")
const { getUserByName } = require("../service/user.service")
const md5password = require("../utils/password-handle")


const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 验证用户名或者密码是否为空
  if (!name || !password) {
    const err = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    ctx.app.emit("error", err, ctx)
    return
  }
  // 验证用户是否已注册
  const res = await getUserByName(name)
  if (res.length) {
    const err = new Error(errorType.USER_ALREADY_EXISTS)
    ctx.app.emit("error", err, ctx)
    return
  }
  // 调用下一个中间件 等待执行完毕
  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
