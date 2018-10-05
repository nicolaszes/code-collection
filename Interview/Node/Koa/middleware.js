co.wrap(compose(this.middleware))

app.use = function(fn){
  // ...

  // 从这段代码，我们可以知道this.middleware就是一个generator函数的数组。
  this.middleware.push(fn)
  return this
}

/**
 * @param {*} middleware 
 * 这里compose函数返回了一个Generator，
 * 所以上面的代码可以变成下面的样子（当然还有middleware的变量再闭包中）
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


co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn
  return createPromise
  function createPromise() {
    return co.call(this, fn.apply(this, arguments))
  }
}


/**
 * 洋葱模型
 * 
 * 这段代码遍历了我们的中间件数组，最终生成了一个类似下面的代码
 * next就是一个Generator函数生成的迭代器（iterator）对象，然后由co来运行
 */
next = (function*(){
  // middleware1
  // ...

  yield (function*(){
    // middleware2
    // ...

    yield (function*(){
      // middleware3
      // ...
      
      yield (function *(){
        // noop
        // NO next yield !
      })()
      
      // ...middleware3
    })
    // ...middleware2
  })
  // ...middleware1
})()

/**
 * co可以对generator的进行自执行
 * 
 * 眼尖的读者可以看到这里最后用到了 yield * 而非 yield
 * 可以有关于 co 的执行，其实就是为了减少 co 的一次运行
 * 其实每次都应该用 yield *next
 * 可能是 tj大神怕大家忘记加了
 * 就索性在 demo 里面就建议大家直接 yield next 就好了。
 * 具体的可以看我对于 co 源码实现的分析
 * 我这里就提一下 yield * 可以自动执行后面的表达式的迭代器属性
 * 而 yield 只会直接返回后面的表达式
 * 所以一个 yield * 可以使 co 直接拿到后面迭代器中的每一步
 * 而yield只可以拿到迭代器，然后递归调用 co 来执行迭代器。
 */
co(function*(){
  // ...

  yield *next
})