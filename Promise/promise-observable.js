/**
 * promise包裹 observable的话  异常是往上抛的，到全局try catch上去了
 * 应该是 promise reject 的时候，rxjs 没办法使用 catchError 捕获
 */
function promiseFunc () {
  return new Promise((resolve, reject) => {
    observable.subscribe(val => resolve(val))
  })
}

const interval$ = Rx.observable.interval(1000).do(val => { throw interval$ })

var promise = promiseFunc(interval$)
promise.then(observable => { console.info(observable) })

/**
 * observable包裹 promise
 */
const pro = new  Promise((resolve, reject) => {
  reject('nico')
}).catch(err => { throw err })

fromPromise(pro).pipe(
  catchError(err => {
    console.log(err)
    return of(err)
  })
).subscribe(console.warn)