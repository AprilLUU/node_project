const { APP_HOST, APP_PORT } = require("../app/config")
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
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url) user,
        m.createAt createTime, m.updateAt updateTime,
        IF(COUNT(l.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ), NULL) labels,
        (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarURL', cu.avatar_url))
        ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE c.moment_id = m.id) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://${APP_HOST}:${APP_PORT}/moment/images/', file.filename))
          FROM file WHERE file.moment_id = m.id) images
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    const [res] = await execSQLWithErrHandle(statement, momentId)
    return res[0]
  }

  async getMomentList(limit, offset) {
    const statement = `
      SELECT
        m.id id, m.content content,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        m.createAt createTime, m.updateAt updateTime,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://${APP_HOST}:${APP_PORT}/moment/images/', file.filename))
          FROM file WHERE file.moment_id = m.id) images
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

  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [res] = await execSQLWithErrHandle(statement, momentId, labelId)
    return res.length !== 0
  }

  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`
    const [res] = await execSQLWithErrHandle(statement, momentId, labelId)
    return res
  }
}

module.exports = new MomentService()
