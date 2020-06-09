const express = require('express')
const router = express.Router()
const db = require('../../models')

router.get('/', async (req, res) => {
  const response = await db.Task.findAll({where:{deleted: false}})
  res.json(response)
})

router.post('/', async (req, res) => {
  const {name} = req.body
  const response = await db.Task.create({
    name
  })
  res.json(response)
})

router.patch('/:id', async (req, res, next) => {
  const {done} = req.body
  const {id} = req.params

  let currentTask
  try {
    currentTask = await db.Task.findByPk(id)
    if(currentTask.deleted) throw new Error()
  } catch (e){
    return next(new Error('Could not find task'))
  }

  const updatedTask = await currentTask.set('done', done).save()
  res.json(updatedTask)
})

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params

  let task
  try {
    task = await db.Task.findByPk(id)
    if(task.deleted) throw new Error()
  } catch (e){
    return next(new Error('Could not find task'))
  }

  await task.set('deleted', true).save()
  res.status(200).send()
})

module.exports = router