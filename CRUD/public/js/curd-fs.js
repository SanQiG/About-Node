const fs = require('fs')

const db = './db.json'

exports.getAllStuInfo = (cb) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) return cb(err)

    let students = JSON.parse(data).students
    cb(null, students)
  })
}

exports.getStuInfoById = (id, cb) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) cb(err)

    let students = JSON.parse(data).students
    let stu = students.find(item => item.id === id)
    cb(null, stu)
  })
}

exports.addStuInfo = (stu, cb) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) return cb(err)

    let students = JSON.parse(data).students

    if (students.length) {
      stu.id = students[students.length - 1].id + 1
    } else {
      stu.id = 1
    }
      
    students.push(stu)

    let stuInfo = {
      students: students
    }

    fs.writeFile(db, JSON.stringify(stuInfo), (err) => {
      if (err) return cb(err)

      cb(null)
    })
  })
}

exports.upStuInfoById = (stu, cb) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) return cb(err)

    stu.id = +stu.id
    let students = JSON.parse(data).students
    let upStuIndex = students.findIndex(item => item.id === stu.id)

    students[upStuIndex] = stu

    let stuInfo = {
      students: students
    }

    fs.writeFile(db, JSON.stringify(stuInfo), (err) => {
      if (err) return cb(err)

      cb(null)
    })
  })
}

exports.delStuInfo = (id, cb) => {
  fs.readFile(db, 'utf8', (err, data) => {
    if (err) return cb(err)

    let students = JSON.parse(data).students
    let delStuIndex = students.findIndex(item => item.id === id)
    students.splice(delStuIndex, 1)

    let stuInfo = {
      students: students
    }

    fs.writeFile(db, JSON.stringify(stuInfo), (err) => {
      if (err) return cb(err)

      cb(null)
    })
  })
}
