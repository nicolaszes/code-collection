// promise构造函数是同步执行的，then方法是异步执行的
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve(5)
  console.log(2)
}).then(val => {
  console.log(val)
})

promise.then(() => {
  console.log(3)
})

console.log(4)

setTimeout(function () {
  console.log(6)
})

let promiseA = new Promise((resolve, reject) => reject(42))
let promiseB = new Promise((resolve, reject) => resolve(21))
let promiseC = new Promise((resolve, reject) => reject(10))

// promiseA.then((res) => {
//   console.log(res)
// })
//
// Promise.all([
//   promiseA,
//   promiseB
// ]).then(res => {
//   console.log(res)
// })

function add(xPromise, yPromise) {
  return Promise.all([
    xPromise,
    yPromise,
  ]).then(res => {
    console.log('return')
    // return res[0] + res[1]
  })
}

// add(promiseA, promiseB).then(res => {
//   console.log(res)
// }).catch(res => {
//   console.log(res)
// })
promiseB.then(res => {
  // console.log(res)
  return promiseA
}).then(res => {
  return promiseC
}).catch(res => {
  console.log(res)
})

new Promise(resolve => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
    resolve()
    console.log(3)
  })
}).then(() => {
  throw new Error('fail')
}).then(() => {
  console.log(4)
}).then(() => {
  console.log(5)
}, () => {
  console.log(6)
}).then(() => {
  console.log(7)
})
console.log(8)

// 1, 8, 2, 3, 6, 7


const p = Promise.resolve('p')
const e = () => {
  console.log('e')
  throw new Error('e')
}
const b = (err) => {
  console.log('b')
  return Promise.resolve('b')
}
const c = () => Promise.resolve('c')
const f = (err) => {
  console.log('f')
  return Promise.resolve('f')
}

p.then(e, b).then(c, f).catch(err => {
  console.log('err')
})
// e, f --end


/**
 * async await promise 的执行顺序
 */
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}
console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

// script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout

/**
 * 执行顺序
 */
console.log(1)
new Promise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
    resolve()
    reject()
  }, 10)

  setTimeout(() => {
    console.log(4)
  })
  console.log(9)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
}).catch(e => {
  console.log(7)
})
console.log(8)
// 1, 2, 9, 8, 4, 3, 5, 6

console.log(1)
new Promise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
    resolve()
    reject()
  }, 10)

  setTimeout(() => {
    console.log(4)

    new Promise((resolve, reject) => {
      console.log(11)

      setTimeout(() => {
        console.log(12)

        new Promise((resolve, reject) => {
          console.log(13)
          reject()

          console.log(14)

          setTimeout(() => {
            console.log(15)
          }, 20)
        }).then(() => {
          console.log(16)
        }).catch(() => {
          console.log(22)
        }).then(() => {
          console.log(23)
        })
      }, 0)
    })
  }, 20)
  console.log(9)
}).then(() => {
  console.log(5)
  new Promise((resolve, reject) => {
    console.log(17)
    resolve()

    setTimeout(() => {
      console.log(18)

      new Promise((resolve, reject) => {
        console.log(19)
        resolve()

        console.log(20)

        setTimeout(() => {
          console.log(21)
        }, 20)
      })
    }, 0)
  })
}).then(() => {
  console.log(6)
}).catch(e => {
  console.log(7)
})
console.log(8)

// 1, 2, 9, 8, 3, 5, 17, 6, 18, 19, 20, 4, 11, 12, 13, 14, 22, 23, 21, 15