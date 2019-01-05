/**
 * understand promise deeply
 */

/**
 * get use id solution
 * getUserId 返回一个 promise,
 * 可以通过它的 then方法注册一个在 promise异步操作成功时执行的回调
 */
function getUserId() {
  return new Promise(resolve => {
    http.get(url, function (result) {
      resolve(result.id)
    })
  })
}
getUserId().then(res => {
  console.log(res)
})

// 原理分析
/**
 * 极简 promise
 * 1. 调用 then方法，将想要在 promise异步操作成功时执行的回调放入 callbacks队列
 * 也就是注册回调函数
 * 2. 创建 promise 实例时传入的函数会被赋予一个函数类型的参数，即 resolve，它接受一个
 * 参数 value，代表异步操作返回的结果，当异步操作执行成功后，用户回调用 resolve方法，
 * 这是真正执行操作的是将 callbacks队列中的回调一一执行
 */
function Promise2(fn) {
  var value = null,
    callbacks = [] // callbacks 为数组，因为可能同时有多个回调，(success => {}, error => {})

  // 注册 then之后的回调函数
  this.then = function (onFulfilled) {
    callbacks.push(onFulfilled)
  }

  function resolve(value) {
    callbacks.forEach(function (callback) {
      callback(value)
    })
  }

  fn(resolve)
}

/**
 * then 方法支持链式调用
 */
this.then = function (onFulfilled) {
  callbacks.push(onFulfilled)
  return this // 一句话支持链式调用
}

/**
 * 加入延时机制
 * 如果 then方法注册回调之前，resolve函数就执行了
 * 例如 promise内部的函数是同步函数
 */
function resolve(value) {
  // 通过 setTimeout机制，将 resolve中执行回调的逻辑， 放到 JS任务队列末尾
  // 以保证 resolve执行时，then方法的回调函数已经注册完成
  setTimeout(function () {
    callbacks.forEach(function (callback) {
      callback(value)
    })
  }, 0)
}

/**
 * 加入状态: pending, fulfilled, rejected
 * resolve 执行时会将状态设置为 fulfilled，此后调用 then添加的新回调，都会立即执行
 */
function Promise2(fn) {
  var state = 'pending',
      value = null,
      callbacks = [] // callbacks 为数组，因为可能同时有多个回调，(success => {}, error => {})

  // 注册 then之后的回调函数
  this.then = function (onFulfilled) {
    if (state === 'pending') {
      callbacks.push(onFulfilled)
      return this
    }

    onFulfilled(value)
    return this
  }

  function resolve(newValue) {
    value = newValue
    state = 'fulfilled'
    callbacks.forEach(function (callback) {
      callback(value)
    })
  }

  fn(resolve)
}

/**
 * 链式 promise
 * 1. then方法中，创建并返回新的 Promise实例，这是串行 promise的基础，并且支持链式调用
 * 2. handle方法是 promise内部的方法。then方法传入的形参 onFulfilled以及
 * 创建新的 promise实例时传入的 resolve均被 push到当前 promise的 callbacks队列中，
 * 这是衔接当前 promise和后邻 promise的关键所在
 *
 */
this.then = function (onFulfilled) {
  return new Promise2(function (resolve) {
    handle({
      onFulfilled: onFulfilled || null,
      resolve: resolve,
    })
  })
}

function handle(callback) {
  if (state === 'pending') {
    callbacks.push(callback)
    return
  }

  // 如果 then没有传递任何东西
  if (!callback.onFulfilled) {
    callback.resolve(value)
    return
  }

  var ret = callback.onFulfilled(value)
  callback.resolve(ret)
}

function resolve(newValue) {
  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
    var then = newValue.then
    if (typeof newValue === 'function') {
      then.call(newValue, resolve)
      return
    }
  }

  state = 'fulfilled'
  value = newValue
  setTimeout(function () {
    callbacks.forEach(function (callback) {
      callback(value)
    })
  }, 0)
}

/**
 * 失败处理
 * rejected 和 error
 */
this.then = function (onFulfilled, onRejected) {
  return new Promise2(function (resolve, reject) {
    handle({
      onFulfilled: onFulfilled,
      onRejected: onRejected,
      resolve: resolve,
      reject: reject,
    })
  })
}

function handle(callback) {
  if (state === 'pending') {
    callbacks.push(callback)
    return
  }

  var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
  var ret

  if (cb === null) {
    cb = state === 'fulfilled' ? callback.resolve : callback.reject
    cb(value)
    return
  }
  ret = cb(value)
  callback.resolve(ret)
}

function resolve(newValue) {
  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
    var then = newValue.then
    if (typeof newValue === 'function') {
      then.call(newValue, resolve, reject)
      return
    }
  }

  state = 'fulfilled'
  value = newValue
  execute()
}

function reject(reason) {
  state = 'rejected'
  value = reason
  execute()
}

function execute() {
  setTimeout(function () {
    callbacks.forEach(function (callback) {
      callback(value)
    })
  }, 0)
}

fn(resolve, reject)

/**
 * 异常处理
 *
 * 如果在执行成功回调，失败回调时代码出错怎么办？
 * 对于这类异常，可以用 try catch捕获错误，并将 bridge promise设为 rejected状态
 *
 * 如果在异步操作中，多次执行 resolve或者 reject会重复处理后续回调，可以通过内置一个标志位解决
 */
function handle(callback) {
  if (state === 'pending') {
    callbacks.push(callback)
    return
  }

  var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
  var ret
  if (cb === null) {
    cb = state === 'rejected' ? callback.resolve : callback.reject
    cb(value)
    return
  }

  try {
    ret = cb(value)
    callback.resolve(ret)
  } catch (err) {
    call.reject(err)
  }
}

/**
 * 总结
 * Promise的实现过程，主要是用了设计模式中的观察者模式
 * 1.通过 Promise.prototype.then 和 Promise.prototype.catch方法
 * 将观察者方法注册到被观察的 Promise对象中，同时返回一个新的 Promise对象，
 * 以便可以链式调用
 * 2.被观察者管理内部 pending，fulfilled和 rejected的状态转变，同时通过
 * 构造函数中传递的 resolve和 reject 方法以主动触发状态转变和通知观察者
 */