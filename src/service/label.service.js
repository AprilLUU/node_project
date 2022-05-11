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
}

module.exports = new LabelService()
