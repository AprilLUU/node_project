const execSQLWithErrHandle = require("../utils/exec-sql-with-err-handle")

// const sqlFarment = `
//   SELECT
//     m.id id, m.content content,
//     JSON_OBJECT('id', u.id, 'name', u.name) user,
//     m.createAt createTime, m.updateAt updateTime
//   FROM moment m LEFT JOIN user u
//   on m.user_id = u.id
// `

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES(?, ?);`
    const [res] = await execSQLWithErrHandle(statement, content, userId)
    return res
  }

  async getMomentById(momentId) {
    const statement = `
      SELECT
        m.id id, m.content content,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        m.createAt createTime, m.updateAt updateTime,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name))
        ) comments
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN user cu ON c.user_id = cu.id
      WHERE m.id = ?;
    `
    const [res] = await execSQLWithErrHandle(statement, momentId)
    const item = res[0]
    if (item.comments.length === 1 && item.comments[0].id === null) {
      item.comments = []
    }
    return item
  }

  async getMomentList(limit, offset) {
    const statement = `
      SELECT
        m.id id, m.content content,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        m.createAt createTime, m.updateAt updateTime,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
      FROM moment m LEFT JOIN user u
      ON m.user_id = u.id
      LIMIT ? OFFSET ?;
    `
    const [res] = await execSQLWithErrHandle(statement, limit, offset)
    return res
  }

  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statement, content, momentId)
    return res
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statement, momentId)
    return res
  }
}

module.exports = new MomentService()
