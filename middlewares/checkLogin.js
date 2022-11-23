require("dotenv").config()
const jwt = require("jsonwebtoken")

function checkLogin(req, res, next) {
  const token = req.headers["Authorization"]
  console.log(token)
  return next()
}

module.exports = checkLogin