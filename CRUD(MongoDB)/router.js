const express = require('express')

const Student = require('./public/js/student')
const errHandle = require('./public/js/error')

const router = express.Router()

router.get('/', (req, res) => {
  Student.find().then(value => {
    res.render('index.html', {
      students: value
    })
  }).catch(err => errHandle(res, 500, 'Interval Server Error.'))
})

router.get('/new', (req, res) => {
  res.render('new.html')
})

router.post('/new', (req, res) => {
  const stu = new Student(req.body)
  
  stu.save().then(value => res.redirect('/'))
            .catch(err => errHandle(res, 500, 'Interval Server Error.'))
})

router.get('/edit', (req, res) => {
  Student.findById(req.query.id).then(value => {
    res.render('edit.html', {
      student: value
    })
  }).catch(err => errHandle(res, 500, 'Interval Server Error.'))
})

router.post('/edit', (req, res) => {
  Student.findByIdAndUpdate(req.body.id, req.body).then(value => res.redirect('/'))
                                                  .catch(err => errHandle(res, 500, 'Interval Server Error.'))
})

router.get('/del', (req, res) => {
  Student.findByIdAndRemove(req.query.id).then(value => res.redirect('/'))
                                         .catch(err => errHandle(res, 500, 'Interval Server Error.'))
})

module.exports = router
