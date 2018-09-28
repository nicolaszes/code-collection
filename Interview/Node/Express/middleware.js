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