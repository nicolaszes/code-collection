var express = require('express')

var app = express()

app.listen(3000, function () {
  console.log('listening 3000')
})

function middleware1(req, res, next) {
  console.log('middleware1 before next')
  next()
  console.log('middleware1 after next')
}

function middleware2(req, res, next) {
  console.log('middleware2 before next')
  next()
  console.log('middleware2 after next')
}

function middleware3(req, res, next) {
  console.log('middleware3 before next')
  next()
  console.log('middleware3 after next')
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)

/**
 * 实现一个简单的 express中间件
 */
function express() {
  var middlewares = []

  var app = function (req, res) {
    var i = 0

    function next() {
      var task = functions[i++]
      if (!task) {
        return
      }
      task(req, res, next)
    }
    next()
  }

  app.use = function (task) {
    functions.push(task)
  }

  return app
}