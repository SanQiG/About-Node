const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8088

// 当以 /public/ 开头的时候，去 './public/' 目录中找到对应的资源
app.use('/public/', express.static('./public/'))
// 当省略第一个参数的时候，则可以通过省略 /public/ 的方式来访问对应的资源
// app.use(express.static('./public/'))

// 配置使用 art-template 模板引擎
app.engine('html', require('express-art-template'))
// res.render 方法默认是不可以被使用的， 但是如果配置了模板引擎就可以使用了
// render 方法的第一个参数不能写路径，默认会去项目的 views 目录查找该模板文件
// 如果想要修改默认的 views 目录为xxx，则可以做如下配置：
// app.set('views', xxx)

// 配置 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let comments = []

app.get('/', (req, res) => {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', (req, res) => {
  res.render('post.html')
})

// POST
app.post('/post', (req, res) => {
  req.body.date = new Date()
  comments.unshift(req.body)
  res.redirect('/')
})

app.get('*', (req, res) => res.render('404.html'))

app.listen(port, () => console.log(`App is running at http://localhost:${port}`))
