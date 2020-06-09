require('dotenv').config();

const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')
var jwt = require('express-jwt');

const tasksRouter = require('./routes/tasks')
const loginRouter = require('./routes/login')

app.use(express.json())
app.use(cors())

app.listen(config.PORT, function () {
    console.log(`Example app listening on port ${config.PORT}!`)
})

app.use('/tasks', jwt({secret: process.env.TOKEN_KEY}), tasksRouter)
app.use('/login', loginRouter)

app.use((err, req, res, next)=>{
    console.error(err)
    const {message} = err
    res.status(500).json({message})
})