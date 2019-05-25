require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routers/')
const NODE_ENV = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.UNAME_ATLAS}:${process.env.PASS_ATLAS}@cluster0-xt9f0.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true } )
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/',router)
app.use(morgan('dev'));
app.listen(port,()=>{
    console.log(port)
})




module.exports = app