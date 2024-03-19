const express = require('express')
const router = express.Router()
const data = {}
data.employees = require('../../data/employees.json')

router
  .route('/')
  .get((req, res) => {
    res.json(data.employees)
  })
  .post((req, res) => {
    res.json({
      Vorname: req.body.Vorname,
      Nachname: req.body.Nachname,
    })
  })
  .put((req, res) => {
    res.json({
      Vorname: req.body.Vorname,
      Nachname: req.body.Nachname,
    })
  })
  .delete((req, res) => {
    res.json({ id: req.body.id })
  })

router.route('/:id').get((req, res) => {
  res.json({ id: req.params.id })
})

module.exports = router
