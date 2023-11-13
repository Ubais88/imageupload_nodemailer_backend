const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {console.log("DB connection established")})
        .catch((error) => {console.log("Error connecting to DB")})
}

module.exports = dbConnect