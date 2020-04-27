const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/students', {useNewUrlParser: true, useUnifiedTopology: true})

const stuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  age: {
    type: Number
  },
  tel: {
    type: String
  }
})

module.exports = mongoose.model('Student', stuSchema)
