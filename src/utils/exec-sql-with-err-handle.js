const connection = require("../app/database")

async function execSQLWithErrHandle(statement, ...args) {
  try {
    const res = await connection.execute(statement, args)
    return res
  } catch(err) {
    console.log("SQL execute error")
    console.log(err)
    throw new Error("SQL execute error")
  }
}

module.exports = execSQLWithErrHandle
