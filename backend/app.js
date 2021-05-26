const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require("cors")
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const middleware = require('./utils/middleware')

const userRouter = require('./routers/userRouter')
const noteRouter = require('./routers/noteRouter')

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
}))
app.use(express.static('build'))


mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.error(err)
    })

app.use('/auth', userRouter)
app.use('/notes', noteRouter)

app.use(middleware.errorHandler)

module.exports = app