const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogrouter = require('./controller/blogrouter')
const middleware = require('./util/middleware')
const config = require('./util/config')
const mongoose = require('mongoose')
const logger = require('./util/logger')
const userrouter = require('./controller/userrouter')
const loginrouter = require('./controller/loginrouter')

logger.info(config.MONGO_DB_USER)
logger.info(config.MONGO_DB_PW)
mongoose.set('strictQuery', false)
mongoose
  .connect(
    config.MONGO_DB_URI
  )
  // eslint-disable-next-line no-unused-vars
  .then((response) => {
    logger.info('DB connected')
  })
  .catch((error) => {
    logger.info('Error Occured')
    logger.error(error)
  })
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


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
