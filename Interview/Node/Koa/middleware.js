co.wrap(compose(this.middleware))

app.use = function(fn){
  // ...

  // 从这段代码，我们可以知道this.middleware就是一个generator函数的数组。
  this.middleware.push(fn)
  return this
}

/**
 * @param {*} middleware 
 * 这里compose函数返回了一个Generator，所以上面的代码可以变成下面的样子（当然还有middleware的变量再闭包中）
 */
function compose(middleware){
  return function *(next){
    if (!next) next = noop()

    var i = middleware.length

    while (i--) {
      next = middleware[i].call(this, next)
    }

    return yield *next
  }
}

function *noop(){}

co.wrap(function *(next){
  if (!next) next = noop()

  var i = middleware.length

  while (i--) {
    next = middleware[i].call(this, next)
  }

  return yield *next
})