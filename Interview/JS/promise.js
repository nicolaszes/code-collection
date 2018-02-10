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
