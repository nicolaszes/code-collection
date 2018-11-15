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

function add (xPromise, yPromise) {
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
// p, e, f --end


/**
 * async await promise 的执行顺序
 */
async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2(){
  console.log('async2')
}
console.log('script start')

setTimeout(function(){
  console.log('setTimeout')
}, 0)

async1()

new Promise(function(resolve){
  console.log('promise1')
  resolve()
}).then(function(){
  console.log('promise2')
})
console.log('script end')


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