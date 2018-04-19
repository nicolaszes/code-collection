/**
 * Promise类的结构
 * 
 * 1. promise对象初始状态为 Pending，在被 resolve或 reject时，状态变为 Fulfilled或 Rejected
 * 2. resolve接收成功的数据，reject接收失败或错误的数据
 * 3. Promise对象必须有一个 then方法，且只接受两个函数参数 onFulfilled / onRejected
 */

// 大致结构
function Promise(resolver) {
  if (resolver && typeof resolver !== 'function') {
    throw new Error('Promise')
  }
  // 当前 promise的状态
  this.state = 'PENDING'
  // 当前 promise对象的数据（成功或失败）
  this.data = undefined
  // 当前 promise对象注册的回调队列
  this.callbackQueue = []
  // 执行 resolve 或 reject方法
  if (resolver) executeResolver.call(this, resolver)
}

Promise.prototype.then = function () {}
/**
 * 一个 Promise的构造函数和一个实例方法 then()就是 Promise的核心，其他的都是 Promise的语法糖或者说是扩展
 */

/**
 * 构造器的初始化
 * executeResolver
 */
// 用于执行 new Promise()中的 resolve，reject方法
function executeResolver(resolver) {
  var called = false,
       _this = this;

  function onError(value) {
    if (called) { return }
    called = true
    executeCallback.bind(_this)('reject', value)
  }

  function onSuccess(value) {
    if (called) { return }
    called = true
    executeCallback.bind(_this)('resolve', value)
  }

  try {
    resolver(onSuccess, onError)
  } catch (e) {
    onError(e)
  }
}

function executeCallback (type, x) {
  var isResolve = type === 'resolve', thenable;

  if (isResolve && (typeof x === 'object' || typeof x === 'function')) {
    try {
      thenable = getThen(x)
    } catch (e) {
      return executeCallback.bind(this)('reject', e)
    }
  }

  if (isResolve && thenable) {
    executeResolver.bind(this)(thenable)
  } else {
    this.state = isResolve ? 'RESOLVED' : "REJECTED"
    this.data = x
    this.callbackQueue && this.callbackQueue.length && this.callbackQueue.forEach(v => {
      v[type](x)
    });
  }

  return this
}

function getThen (obj) {
  var then = obj && obj.then
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function applyThen() {
      then.apply(obj, arguments)
    }
  }
}

/**
 * then 方法
 * 1. then方法必须返回一个新的 Promise实例
 * 2. 为了保证 then中回调的执行顺序，onFulfilled 或 onRejected 必须异步调用
 */
Promise.prototype.then = function (onResolved, onRejected) {
  if (typeof onResolved !== 'function' && this.state === 'RESOLVED' ||
    typeof onRejected !== 'function' && this.state === 'REJECTED') {
    return this
  }

  // 实例化一个新的 promise对象
  var promise = new this.constructor()

  // 一般情况下，状态发生改变时，走这里
  if (this.state !== 'PENDING') {
    var callback = this.state === 'RESOLVED' ? onResolved : onRejected
    executeCallbackAsync.bind(promise)(callback, this.data)
  } else {
    this.callbackQueue.forEach(v => v[type](x))
  }

  return promise
}

/**
 * executeCallbackAsync
 * 1. 如果出错，则自动调用 reject(reason) 方法并更改状态为 rejected，传递错误数据给当前的 then方法中注册的 onRejected 回调
 * 2. 如果成功，则自动调用 resolve(value) 方法并更改状态为 resolved，传递方法给当前实例 then方法中注册的 onResolved 回调
 */
function executeCallbackAsync(callback, value) {
  var _this = this

  // 这里最好不要用 setTimeout，使用 setTimeout 可以执行异步回调，但其实不是真正的异步线程，
  // 而是利用的浏览器的 Event Loop机制去触发执行回调，而浏览器的事件轮循时间间隔是 4ms，
  // 所以连接的调用 setTimeout 会有 4ms的时间间隔
  //
  // 而在 Node.js中的 Event Loop时间间隔是 1ms，所以会产生一定的延迟，
  // 如果 promise链比较长，延迟就会越明显
  // 这里可以引用 NPM上的 immediate 模块来异步无延迟的执行回调
  setTimeout(function () {
    var res;
    try {
      res = callback(value)
    } catch(e) {
      return executeCallbackAsync.bind(_this)('reject', e)
    }

    if (res !== _this) {
      return executeCallbackAsync.bind(_this)('resolve', res)
    } else {
      return executeCallbackAsync.bind(_this)('reject', new TypeError('Cannot resolve promise with itself'))
    }
  }, 1)
}

function CallbackItem (promise, onResolved, onRejected) {
  this.promise = promise
  // 为了保证在 promise 链中，resolve 或 reject 的结果可以一直向后传递，可以默认给 then 添加 resolvedFn 和 rejectedFn
  this.onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
  this.onResolved = typeof onRejected === 'function' ? onRejected : function (err) { throw err }
}

CallbackItem.prototype.resolve = function (value) {
  executeCallbackAsync.bind(this.promise)(this.onResolved, value)
}

CallbackItem.prototype.reject = function (value) {
  executeCallbackAsync.bind(this.promise)(this.onRejectd, value)
}