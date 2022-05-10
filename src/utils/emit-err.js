const emitErr = (ctx, errorType) => {
  const err = new Error(errorType)
  ctx.app.emit("error", err, ctx)
}

module.exports = emitErr
