const execSQLWithErrHandle = require("../utils/exec-sql-with-err-handle")

class CommentService {
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`
    const [res] = await execSQLWithErrHandle(statement, content, momentId, userId)
    return res
  }

  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [res] = await execSQLWithErrHandle(statement, content, momentId, userId, commentId)
    return res
  }

  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statement, content, commentId)
    return res
  }

  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`
    const [res] = await execSQLWithErrHandle(statement, commentId)
    return res
  }

  async getCommentsByMomentId(momentId) {
    const statement = `
      SELECT
        c.id, content, c.comment_id commentId, JSON_OBJECT('id', u.id, 'name', u.name) user, c.createAt createTime
      FROM comment c
      LEFT JOIN user u ON c.user_id = u.id
      WHERE c.moment_id = ?;
    `
    const [res] = await execSQLWithErrHandle(statement, momentId)
    return res
  }
}

module.exports = new CommentService()
