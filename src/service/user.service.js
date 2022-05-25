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

  async getUserById(id) {
    const statament = `SELECT id, name, createAt createTime, avatar_url avatarURL FROM user WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statament, id)
    return res[0]
  }

  async updateAvatarURLById(avatarURL, id) {
    const statament = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statament, avatarURL, id)
    return res
  }
}

module.exports = new UserService()
