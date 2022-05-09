const app = require("./app")
const { APP_PORT } = require("./app/config")

app.listen(APP_PORT, () => {
  console.log(`当前服务已经启动~~`)
})
