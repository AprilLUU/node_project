const execSQLWithErrHandle = require("../utils/exec-sql-with-err-handle")

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`
    const [res] = await execSQLWithErrHandle(
      statement,
      filename,
      mimetype,
      size,
      userId
    )
    return res
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [res] = await execSQLWithErrHandle(statement, userId)
    return res[res.length - 1]
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`
    const [res] = await execSQLWithErrHandle(
      statement,
      filename,
      mimetype,
      size,
      userId,
      momentId
    )
    return res
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`
    const [res] = await execSQLWithErrHandle(statement, filename)
    return res[0]
  }
}

module.exports = new FileService()
