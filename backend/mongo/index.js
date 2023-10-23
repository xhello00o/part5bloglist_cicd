const config = require('../util/config')
const mongoose = require('mongoose')
const logger = require('../util/logger')
const Blog = require('./models/bloglist')
const User = require('./models/user')

mongoose.createConnection

mongoose.set('strictQuery', false)
if (process.env.MONGO_URL && !mongoose.connection.readyState) {
  mongoose
    .connect(
      config.MONGO_DB_URI,
    )
  // eslint-disable-next-line no-unused-vars
    .then((response) => {
      logger.info('DB connected')
      logger.info(response)
    })
    .catch((error) => {
      logger.info('Error Occured')
      logger.error(error)
    }) }

module.exports={ Blog,User }
