const labelService = require("../service/label.service")
const emitErr = require("../utils/emit-err")
const errorType = require("../constants/error-type")


const verifyLabelIsExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []

  for (let name of labels) {
    try {
      // 判断标签是否存在
      const labelRes = await labelService.getLabelByName(name)
      // 添加标签ID
      const label = { name }

      if (!labelRes) {
        const res = await labelService.create(name)
        label.id = res.insertId
      } else {
        label.id = labelRes.id
      }

      newLabels.push(label)

    } catch(error) {
      emitErr(ctx, errorType.QUERY_ERROR)
    }
  }

  ctx.request.body.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelIsExists
}
