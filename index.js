const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')

const tasksRouter = require('./routes/tasks')

app.use(express.json())
app.use(cors())

app.listen(config.PORT, function () {
    console.log(`Example app listening on port ${config.PORT}!`)
})

app.use('/tasks', tasksRouter)