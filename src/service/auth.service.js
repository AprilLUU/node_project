const execSQLWithErrHandle = require("../utils/exec-sql-with-err-handle")

class AuthService {
  async checkResource(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    const [res] = await execSQLWithErrHandle(statement, id, userId)
    return res.length !== 0
  }
}

module.exports = new AuthService()
