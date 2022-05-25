const jwt = require("jsonwebtoken")

const errorType = require("../constants/error-type")
const emitErr = require("../utils/emit-err")
const userService = require("../service/user.service")
const authService = require("../service/auth.service")
const md5password = require("../utils/password-handle")
const config = require("../app/config")

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!name || !password) {
    emitErr(ctx, errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return
  }

  try {
    // 判断用户是否存在
    const user = await userService.getUserByName(name)
    if (!user) {
      emitErr(ctx, errorType.USER_DOES_NOT_EXISTS)
      return
    }
    // 验证密码是否正确
    if (md5password(password) !== user.password) {
      emitErr(ctx, errorType.PASSWORD_IS_INCORRENT)
      return
    }

    ctx.user = user
    await next()
  } catch (error) {
    emitErr(ctx, errorType.QUERY_ERROR)
  }
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    emitErr(ctx, errorType.UNAUTHORIZATION)
    return
  }
  const token = authorization.replace("Bearer ", "")

  try {
    const res = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = res
    await next()
  } catch (error) {
    emitErr(ctx, errorType.UNAUTHORIZATION)
  }
}

// 判断用户是否有修改和删除权限,即该条动态或评论是否属于该用户
const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace("Id", "")
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user
  // 查询是否有修改和删除权限
  try {
    const isPermission = await authService.checkResource(
      tableName,
      resourceId,
      id
    )
    if (!isPermission) {
      emitErr(ctx, errorType.UNPERMISSION)
      return
    }
    await next()
  } catch (error) {
    emitErr(ctx, errorType.QUERY_ERROR)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
