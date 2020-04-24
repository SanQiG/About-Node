/**
 * app.js 项目入口模块
 * 职责：
 *  1. 创建服务
 *  2. 配置服务
 *    - 模板引擎
 *    - body-parse 解析 POST 请求数据
 *    - 提供静态资源服务
 *  3. 挂载路由
 *  4. 监听端口启动服务
 */
// 加载第三方包
const express = require('express')
const bodyParser = require('body-parser')

// 加载路由模块
const router = require('./router')

const app = express()
const port = 3000

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
