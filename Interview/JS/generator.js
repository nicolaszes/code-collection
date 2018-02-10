function *foo (x) {
  const y = x * (yield 'hello')
  return y
}

const it = foo(6)
it.next()

/**
 * Promise-yielding
 */
function run(gen) {
  var args = [].slice.call(arguments, 1), it;

  // 当前上下文中初始化生成器
  it = gen.apply(this, args)

  // 返回一个promise用于生成器完成
  return Promise.resolve()
    .then(function handleNext(value) {
      // 对下一个 yield出的值运行
      var next = it.next(value);

      return (function handleResult(next) {
        // 生成器运行完毕了么？
        if (next.done) {
          return next.value
        }

        // 否则继续运行
        else {
          return Promise.resolve(next.value)
            .then(
              // 成功就恢复异步循环，把决议的值发回生成器 handleNext
              // 如果 value是被拒绝的 Promise
              // 就把错误传回生成器进行出错处理
              funtion handleError(err) {
                return Promise.resolve(it.throw(err))
                  .then(handleResult)
              }
            )
        }
      })(next);
    })
}

/**
 * 生成器中的 Promise并发
 */
funtion *foo() {
  /**
   * 并非最优的
   * 两个请求是相互独立的，依次执行
   * 并非同时运行（并行）
   */
  var r1 = yield request('http://some.url.1')
  var r2 = yield request('http://some.url.2')

  /**
   * 让两个请求“并行”
   * 等待两个 promise都决议
   * p1, p2是并发执行的
   */
  var p1 = request('http://some.url.1')
  var p2 = request('http://some.url.2')

  var r1 = yield p1
  var r2 = yield p2

  /**
   * 类似于 Promise gate模式
   */
  var results = yield Promise.all([
    request('http://some.url.1'),
    request('http://some.url.2'),
  ])
  var [ r1, r2 ] = results

  var r3 = yield request(
    "http://some.url.3/?v=" + r1 + "," + r2
  )

  console.log(r3)
}

/**
 * 生成器委托
 */
function *foo() {
  console.log('*foo() starting')
  yield 3
  yield 4
  console.log('*foo() finished')
}

function *bar() {
  yield 1
  yield 2
  yield *foo() // yield 委托，消除了对 run的需要
  yield 5
}

var it = bar()
it.next().value // 1
it.next().value // 2
it.next().value // *foo() starting
                // 3
it.next().value // 4
it.next().value // *foo() finished
                // 5

/**
 * 消息委托
 */
function *foo() {
  console.log('inside *foo():', yield 'B')
  console.log('inside *foo():', yield 'C')
  return 'D'
}

function *bar() {
  console.log('inside *bar():', yield 'A')
  console.log('inside *bar():', yield *foo())
  console.log('inside *bar():', yield 'E')
  return 'F'
}

var it = bar()
console.log('outside:', it.next().value)
