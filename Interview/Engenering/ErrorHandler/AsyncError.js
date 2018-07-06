/**
 * Generator / Async, Await
 * 不论是同步、异步的异常，await 都不会自动捕获，
 * 但好处是可以自动中断函数，我们大可放心编写业务逻辑，而不用担心异步异常后会被执行引发雪崩
 */
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject()
    })
  })
}

async function main() {
  const result = await fetch()
  console.log('请求处理', result) // 永远不会执行
}

main()


/**
 * Async / Await 异常捕获
 * 因为此时的异步其实在一个作用域中，通过 generator 控制执行顺序
 * 所以可以将异步看做同步的代码去编写，包括使用 try catch 捕获异常
 */
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('no')
    })
  })
}

async function main() {
  try {
    const result = await fetch()
    console.log('请求处理', result) // 永远不会执行
  } catch (error) {
    console.log('异常', error) // 异常 no
  }
}

main()

/**
 * async await 无法捕获的异常
 * Promise 无法捕获的异常 一样，这也是 await 的软肋，不过任然可以通过第六章的方案解决
 */
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('收敛一些')
    })
  })
}

async function main() {
  try {
    const result = await thirdFunction()
    console.log('请求处理', result) // 永远不会执行
  } catch (error) {
    console.log('异常', error) // 异常 收敛一些
  }
}

main()

/**
 * 为什么 await 是更加优雅的方案
 */
async function main() {
  try {
    const result1 = await secondFunction() // 如果不抛出异常，后续继续执行
    const result2 = await thirdFunction() // 抛出异常
    const result3 = await thirdFunction() // 永远不会执行
    console.log('请求处理', result) // 永远不会执行
  } catch (error) {
    console.log('异常', error) // 异常 收敛一些
  }
}

main()