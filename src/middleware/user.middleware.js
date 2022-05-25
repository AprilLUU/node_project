const errorType = require("../constants/error-type")
const { getUserByName } = require("../service/user.service")
const emitErr = require("../utils/emit-err")
const md5password = require("../utils/password-handle")


const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 验证用户名或者密码是否为空
  if (!name || !password) {
    emitErr(ctx, errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return
  }
  // 验证用户是否已注册
  try {
    const res = await getUserByName(name)
    if (res) {
      emitErr(ctx, errorType.USER_ALREADY_EXISTS)
      return
    }
    // 调用下一个中间件 等待执行完毕
    await next()
  } catch(error) {
    emitErr(ctx, errorType.QUERY_ERROR)
  }

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
