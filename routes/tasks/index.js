const express = require('express')
const router = express.Router()
const db = require('../../models')

router.get('/', async function(req, res) {
  const response = await db.Task.findAll()
  res.json(response)
});

module.exports = router