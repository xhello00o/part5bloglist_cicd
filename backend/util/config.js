require('dotenv').config()

const PORT = process.env.PORT
const MONGO_DB_PW = process.env.MONGO_DB_PW
const MONGO_DB_USER = process.env.MONGO_DB_USER

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PW}@cluster0.btr3mlg.mongodb.net/bloglist?retryWrites=true&w=majority`
const TEST_MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PW}@cluster0.btr3mlg.mongodb.net/testapp?retryWrites=true&w=majority`

const LOCAL_MONGO_DB_URL = process.env.MONGO_URL

console.log(LOCAL_MONGO_DB_URL)

const MONGO_DB_URI = LOCAL_MONGO_DB_URL
/*process.env.NODE_ENV === 'test'
  ? TEST_MONGO_DB_URL
  : MONGO_DB_URL*/
module.exports ={ PORT, MONGO_DB_PW,MONGO_DB_USER, MONGO_DB_URI }
