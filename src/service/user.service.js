const connection = require("../app/database")

class UserService {
  async create(user) {
    const { name, password } = user
    const statament = `INSERT INTO user (name, password) VALUES (?, ?);`
    const res = await connection.execute(statament, [name, password])
    return res[0]
  }

  async getUserByName(name) {
    const statament = `SELECT * FROM user WHERE name = ?;`
    const res = await connection.execute(statament, [name])
    return res[0]
  }
}

module.exports = new UserService()
