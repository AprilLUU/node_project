const execSQLWitjErrHandle = require("../utils/exec-sql-with-err-handle")

class LabelService {
  async create(name) {
    const statement =  `INSERT INTO label (name) VALUES (?);`
    const [res] = await execSQLWitjErrHandle(statement, name)
    return res
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?;`
    const [res] = await execSQLWitjErrHandle(statement, name)
    return res[0]
  }

  async getLabelList(limit, offset) {
    const statement = `SELECT id, name, createAt createTime FROM label LIMIT ? OFFSET ?;`
    const [res] = await execSQLWitjErrHandle(statement, limit, offset)
    return res
  }
}

module.exports = new LabelService()
