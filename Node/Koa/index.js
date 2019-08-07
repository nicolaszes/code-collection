/**
 * 使用体验
 * 
 * 首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。
 * 其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。
 * 
 * 
 * koa采用了new Koa()的方式
 */
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
  ctx.body = 'Hello Koa'
})
app.listen(3000)

/**
 * Views
 * 
 * 需要引入 co-views 中间件
 */
var koa = require('koa')
var route = require('koa-route')
var views = require('co-views')

var render = views(__dirname + '/views', {
  default: "jade"
})

var app = koa()

app.use(route.get('/', function *() {
  this.body = yield render('index', {
    title: 'bilibili'
  })
}))

/**
 * HTTP Request
 */
var app = require('koa')()
var route = require('koa-route')

app.use(route.get('/room/:id', function *() {
  console.log(this.req.query)
}))

// 获取POST数据需要 co-body 中间件
var parse = require('co-body')
app.use(route.post('/sendgift', function *() {
  var post = yield parse(this.request)
  console.log(post)
}))

/**
 * 启动方式
 */
const Emitter = require('events');
module.exports = class Application extends Emitter {
  // ...
}

/**
 * koa处理多个中间件
 * 上面介绍了koa的next()的功能，这里的next()需要同步调用，千万不要采用异步调用
 * 不要写成下面的形式，这样相当于未调用next(), 具体原因后面源码部分会分析:
 * setTimeout(() => next(), 3000)
 */
const Koa = require('koa')
const app = new Koa()
app.use((ctx, next) => {
  ctx.body = 'Hello Koa-1'
  next()
})
app.use((ctx, next) => {
  ctx.body = 'Hello Koa-2'
  next()
})
app.use((ctx, next) => {
  ctx.body = 'Hello Koa-3'
  next()
})
app.listen(3000)

/**
 * koa分路由处理
 * 摘抄自Koa Trie Router
 */
const Koa = require('koa')
const Router = require('koa-trie-router')

let app = new Koa()
let router = new Router()

router
  .use((ctx, next) => {
    console.log('* requests')
    next()
  })
  .get((ctx, next) => {
    console.log('GET requests')
    next()
  })
  .put('/foo', (ctx) => {
    ctx.body = 'PUT /foo requests'
  })
  .post('/bar', (ctx) => {
    ctx.body = 'POST /bar requests'
  })

app.use(router.middleware())
app.listen(3000)

/**
 * 记录处理耗时
 * 
 * 由于koa采用了promise的方式处理中间件，next()实际上返回的是一个promise对象，
 * 如果在es7下，可以采用更简单的写法
 */
const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = 'Hello Koa-1'
  let start = new Date()
  await next()
  console.log("time cost:", new Date()-start)
})
app.use(async (ctx, next) => {
  ctx.body = 'Hello Koa-2'
  //这里用了一个定时器表示实际的操作耗时
  await new Promise((resolve, reject) => setTimeout(() => {
      next()
      resolve()
    }, 3000)
  )
})
app.use((ctx,next) => {
  ctx.body = 'Hello Koa-3'
  next()
})
app.listen(3000)

/**
 * 异步流程控制
 * 
 * Promise
 */
var api1 = 'https://anapioficeandfire.com/api/characters/583'
var api2 = 'https://anapioficeandfire.com/api/characters/584'

function fetchData () {
  fetch(api1).then(res1 => {
    res1.json().then(data1 => {
      fetch(api2).then(res2 => {
        res2.json().then(data2 => console.log(`${data1.name} and ${data2.name} are two characters in Game of Thrones`))
      })
    })
  })
}

fetchData()

/**
 * 异步流程控制
 * 
 * Generator
 */
var api1 = 'https://anapioficeandfire.com/api/characters/583'
var api2 = 'https://anapioficeandfire.com/api/characters/584'

function *fetchData () {
  var name1 = yield request(api1)
  var name2 = yield request(api2)
  console.log(`${name1} and ${name2} are two characters in Game of Thrones`)
}

function request (url) {
  fetch(url).then(res => res.json()).then(data => it.next(data.name))
}

var it = fetchData()
it.next()

/**
 * 异步流程控制
 * 
 * Async/await
 */
var api1 = 'https://anapioficeandfire.com/api/characters/583'
var api2 = 'https://anapioficeandfire.com/api/characters/584'

async function fetchData () {
  var name1 = await request(api1)
  var name2 = await request(api2)
  console.log(`${name1} and ${name2} are two characters in Game of Thrones`)
}

function request (url) {
  return fetch(url).then(res => res.json()).then(data => data.name)
}

fetchData()

/**
 * 错误处理
 * async/await
 */
app.use(function *(next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = { message: err.message }
    this.app.emit('error', err, this)
  }
})