const express = require('express')
const bodyParser = require('body-parser')

const router = require('./router')

const app = express()
const port = 3000

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
