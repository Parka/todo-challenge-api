const express = require('express')
const router = express.Router()
const db = require('../../models')

router.get('/', async function(req, res) {
  const response = await db.Task.findAll({where:{deleted: false}})
  res.json(response)
})

router.post('/', async function(req, res) {
  const {name} = req.body
  const response = await db.Task.create({
    name
  })
  res.json(response)
})

router.patch('/:id', async function(req, res) {
  const {done} = req.body
  const {id} = req.params
  const currentTask = await db.Task.findByPk(id)
  if(currentTask.deleted) throw new Error();
  const updatedTask = await currentTask.set('done', done).save()
  res.json(updatedTask)
})

router.delete('/:id', async function(req, res) {
  const {id} = req.params
  const task = await db.Task.findByPk(id)
  await task.set('deleted', true).save()
  res.status(200).send()
})

module.exports = router