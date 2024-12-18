const path = require("path")
const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"))

const {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PROT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PROT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVATE_KEY,
  PUBLIC_KEY
}
