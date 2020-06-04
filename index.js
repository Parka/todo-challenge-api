const express = require('express')
const app = express()
const config = require('./config')

app.listen(config.PORT, function () {
    console.log(`Example app listening on port ${config.PORT}!`)
})