const emitErr = require("./emit-err")
const errorType = require("../constants/error-type")

const responseWithErrHandle = async (options) => {
  const {
    ctx, serviceName, method, successMsg, errorMsg, args
  } = options

  try {
    const service = require(`../service/${serviceName}`)
    const res = await service[method](...args)
    if (successMsg) {
      ctx.body = successMsg
    } else {
      ctx.body = res
    }
  } catch(error) {
    ctx.errorMsg = errorMsg
    emitErr(ctx, errorType.RESPONSE_ERROR)
  }
}

module.exports = responseWithErrHandle
