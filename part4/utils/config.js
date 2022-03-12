require('dotenv').config()

PORT = 3003
MONGODB_URL = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL
    //? process.env.TEST_MONGODB_URL

module.exports = { PORT, MONGODB_URL }
