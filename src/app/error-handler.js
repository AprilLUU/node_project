const errorType = require("../constants/error-type")

const errorHandler = (err, ctx) => {
  let status, message

  switch (err.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = "用户名或密码不能为空~"
      break
    case errorType.USER_ALREADY_EXISTS:
      status = 409 // Conflict
      message = "用户名已存在~"
      break
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400
      message = "用户名不存在~"
      break
    case errorType.PASSWORD_IS_INCORRENT:
      status = 400
      message = "密码错误~"
      break
    case errorType.UNAUTHORIZATION:
      status = 401
      message = "无效的token,授权失败~"
      break
    default:
      status = 404
      message = "NOT FOUND"
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler
