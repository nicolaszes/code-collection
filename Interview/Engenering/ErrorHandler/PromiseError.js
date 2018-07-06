/**
 * Promise 
 * 
 * 只要注意在 macrotask 级别回调中使用 reject，就没有抓不住的异常
 */
Promise.reject('promise error')
  .catch(err => {
    console.log(err)
  })

new Promise((resolve, reject) => {
  reject('promise error')
}).catch(err => {
  console.log(err)
})

new Promise((resolve) => {
  resolve()
}).then(() => {
  throw 'promise error'
}).catch(err => {
  console.log(err)
})

/**
 * Promise 无法捕获的异常
 * 
 * 永远不要在 macrotask 队列中抛出异常
 * 因为 macrotask队列脱离了运行上下文环境
 * 异常无法被当前作用域捕获
 * @param {*} callback 
 */
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      throw Error('用户不存在')
    })
  })
}

fetch().then(result => {
  console.log('请求处理', result) // 永远不会执行
}).catch(error => {
  console.log('请求处理异常', error) // 永远不会执行
})


/**
 * microtask 中抛出的异常可以被捕获
 * microtask 并没有离开当前的作用域
 */
Promise.resolve(true).then((resolve, reject) => {
  throw Error('microtask 中的异常')
}).catch(error => {
  console.log('捕获异常', error) // 捕获异常 Error: microtask 中的异常
})


/**
 * 如果第三方函数在 macrotask 回调中以 throw Error 的方式抛出异常怎么办？
 * 值得欣慰的是，由于不在同一个调用栈，虽然这个异常无法被捕获，但也不会影响当前调用栈的执行。
 */
function thirdFunction() {
  setTimeout(() => {
    throw Error('就是任性')
  })
}

Promise.resolve(true).then((resolve, reject) => {
  thirdFunction()
}).catch(error => {
  console.log('捕获异常', error)
})


/**
 * 唯一的解决办法，是第三方函数不要做这种傻事，一定要在 macrotask 抛出异常的话，请改为 reject 的方式。
 * 如果 return thirdFunction() 这行缺少了 return 的话，依然无法抓住这个错误
 * 这是因为没有将对方返回的 Promise 传递下去，错误也不会继续传递。
 */
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('收敛一些')
    })
  })
}

Promise.resolve(true).then((resolve, reject) => {
  return thirdFunction()
}).catch(error => {
  console.log('捕获异常', error) // 捕获异常 收敛一些
})

/**
 * 这样还不是完美的办法，不但容易忘记 return
 * 而且当同时含有多个第三方函数时，处理方式不太优雅
 */
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('收敛一些')
    })
  })
}

Promise.resolve(true).then((resolve, reject) => {
  return thirdFunction().then(() => {
    return thirdFunction()
  }).then(() => {
    return thirdFunction()
  }).then(() => {})
}).catch(error => {
  console.log('捕获异常', error)
})
