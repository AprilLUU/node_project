const execSQLWithErrHandle = require("../utils/exec-sql-with-err-handle")

class UserService {
  async create(user) {
    const { name, password } = user
    const statament = `INSERT INTO user (name, password) VALUES (?, ?);`
    const [res] = await execSQLWithErrHandle(statament, name, password)
    return res
  }

  async getUserByName(name) {
    const statament = `SELECT * FROM user WHERE name = ?;`
    const [res] = await execSQLWithErrHandle(statament, name)
    return res[0]
  }
}

module.exports = new UserService()
