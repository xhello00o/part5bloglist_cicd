const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogrouter = require('./controller/blogrouter')
const middleware = require('./util/middleware')
const userrouter = require('./controller/userrouter')
const loginrouter = require('./controller/loginrouter')



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use(express.static('build'))

app.use('/api/login', loginrouter)
app.use('/api/blogs',blogrouter)
app.use('/api/users',userrouter)
console.log('🚀 ~ file: app.js:38 ~ process.env.NODE_ENV :', process.env.NODE_ENV )
if (process.env.NODE_ENV === 'test') {

  console.log('yes')
  const testrouter = require('./controller/testrouter')
  app.use('/api/testing', testrouter)
}



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
