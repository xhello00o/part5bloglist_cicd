const loginrouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../mongo/index')
require('dotenv').config()



loginrouter.post('/', async (request, response) => {
  const username = request.body.username
  const password = request.body.password
  const user = await User.find({ username })
  console.log('🚀 ~ file: loginrouter.js:13 ~ loginrouter.post ~ user:', user)

  const passwordCorrect = user.length ===0 ?
    false
    : await bcrypt.compare(password, user[0].passwordHash)


  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    username: user[0].username,
    id:user[0]._id
  }


  const token = jwt.sign(userToken, process.env.SECRET)

  return response.status(200).send({ token, username: user[0].username, name: user[0].name })


})
module.exports = loginrouter