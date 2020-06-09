const express = require('express')
const router = express.Router()
const db = require('../models')
const md5 = require('md5')
const jsonWebToken = require('jsonwebtoken');


router.post('/', async (req, res) => {
  const {email, pass} = req.body
  const response = await db.User.findOne({
    where:{
      email,
      pass: md5(pass + process.env.SALT),
    }
  })
  if(response) {
    const token = jsonWebToken.sign({email}, process.env.TOKEN_KEY);
    res.json({
        token: token
    });
  } else {
    res.sendStatus(401)
  }
})

module.exports = router