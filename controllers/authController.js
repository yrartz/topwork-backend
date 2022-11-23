require("dotenv").config()
const db = require("../models")
const User = db.User
const Role = db.Role
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const DataNotFound = require("../errors/DataNotFound")

const register = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password)
    
    await User.create({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
      roleId: req.body.role
    })
    
    res.send({ msg: "Register successfully" })
  } catch(e) {
    console.log(e)
    if (e.name === "SequelizeUniqueConstraintError") {
      const errors = e.errors[0]
      return res.status(400).send({ path: errors.path, msg: errors.message})
    } else {
      return res.sendStatus(500)
    }
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: {
        model: Role,
        as: "role",
        attributes: ["id", "name"]
      }
    })
    
    if (!user) throw new DataNotFound("Wrong email or password")
    
    if (!bcrypt.compareSync(req.body.password, user.password)) throw new DataNotFound("Wrong email or password")
    
    const token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" })
    
    res.send({ user: {id: user.id, email: user.email, name: user.name, role: user.role.name}, msg: "Login successfully", token})
  } catch(e) {
    console.log(e)
    if (e instanceof DataNotFound) {
      return res.status(404).send({ msg: e.message })
    } else {
      return res.sendStatus(500)
    }
  }
}

module.exports = {
  register,
  login
}