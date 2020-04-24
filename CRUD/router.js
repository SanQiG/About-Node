/**
 * router.js 路由模块
 * 职责：
 *  1. 处理路由
 *  2. 根据不同的请求方法以及请求路径设置具体的请求处理函数
 * 模块遵循单一职责
 */
// Express 提供了一种专门用来包装路由的方式
const express = require('express')

// curd 封装了文件处理的逻辑
const curd = require('./public/js/curd')
const errHandle = require('./public/js/error')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到 router 容器中
// 首页学生信息加载
router.get('/', (req, res) => {
  curd.getAllStuInfo((err, data) => {
    if (err) return errHandle(res, 500, 'Interval Server Error.')

    res.render('index.html', {
      students: data
    })
  })
})

// 渲染新增学生信息页面
router.get('/new', (req, res) => {
  res.render('new.html')
})

// 处理新增学生信息
router.post('/new', (req, res) => {
  curd.addStuInfo(req.body, err => {
    if (err) return errHandle(res, 500, 'Interval Server Error.')

    res.redirect('/')
  })
})

// 渲染编辑学生信息页面
router.get('/edit', (req, res) => {
  curd.getStuInfoById(+req.query.id, (err, data) => {
    if (err) return errHandle(res, 500, 'Interval Server Error.')

    res.render('edit.html', {
      student: data
    })
  })
})

// 处理编辑后的学生信息
router.post('/edit', (req, res) => {
  curd.upStuInfoById(req.body, (err) => {
    if (err) return errHandle(res, 500, 'Interval Server Error.')

    res.redirect('/')
  })
})

// 删除学生信息
router.get('/del', (req, res) => {
  curd.delStuInfo(+req.query.id, err => {
    if (err) return errHandle(res, 500, 'Interval Server Error.')

    res.redirect('/')
  })
})

// 3. 导出 router
module.exports = router
