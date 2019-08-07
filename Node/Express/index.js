/**
 * 使用体验
 * 
 * 线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了
 * 基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。
 * 
 * express采用传统的函数形式
 */
const app = require("express")()
app.use((req, res, next) => {
  res.status(200).send("<h1>headers ...</h1>")
})
app.listen(3001)

/**
 * Views
 * 
 * Express 自身集成了视图功能，提供了 consolidate.js 功能，
 * 支持几乎所有 JavaScript 模板引擎，并提供了视图设置的便利方法
 */
var express = require('express')
var app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', {
    title: 'bilibili'
  })
})

/**
 * HTTP Request
 */
var app = require('express')()

app.get('/room/:id', function (req, res) {
  console.log(req.params)
})

// 获取POST数据需要 body-parser 中间件
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post('/sendgift', function (req, res) {
  console.log(req.body)
})

/**
 * 启动方式
 */
exports = module.exports = createApplication
function createApplication() {
  // ...
}

/**
 * express处理多个中间件
 */
const app = require("express")()
app.use((req, res, next) => {
  console.log("first")
  //next()
})
app.use((req, res, next) => {
  console.log("second")
  //next()
})
app.use((req, res, next) => {
  console.log("third")
  res.status(200).send("<h1>headers ...</h1>")
})
app.listen(3001)

/**
 * express分路由处理
 */
const app = require("express")()
app.use("/first", (req, res, next) => {
  console.log("first")
  res.status(200).send("<h1>headers-first ...</h1>")
})
app.use("/second", (req, res, next) => {
  console.log("second")
  res.status(200).send("<h1>headers-second ...</h1>")
})
app.use("/third", (req, res, next) => {
  console.log("third")
  res.status(200).send("<h1>headers-third ...</h1>")
})
app.listen(3001)

/**
 * 记录处理耗时
 * 
 * express并没有使用promise而是采用了回调的方式处理中间件
 */
let time = null
app
  .use('/', (req, res, next) => {
    time = Date.now()
    next()
  })
  .use('/eg', bidRequest)
  .use('/', (req, res, next) => {
    console.log(`<= time cost[${req.baseUrl}] : `, Date.now() - time, 'ms')
  })

/**
 * 异步流程控制
 * callback
 */
var api1 = 'https://anapioficeandfire.com/api/characters/583'
var api2 = 'https://anapioficeandfire.com/api/characters/584'

function fetchData () {
  $.ajax({
    type: 'GET',
    url: api1,
    dataType: 'json',
    success: function (data1) {
      $.ajax({
        type: 'GET',
        url: api2,
        dataType: 'json',
        success: function (data2) {
          console.log(`${data1.name} and ${data2.name} are two characters in Game of Thrones`)
        }
     })
    }
  })
}

fetchData()

/**
 * 错误处理
 * Express 使用 callback 捕获异常，对于深层次的异常捕获不了
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})