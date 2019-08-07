function iteratorCheck(data) {
  if (!data[Symbol.iterator] || typeof data[Symbol.iterator] !== 'function') {
    const simpleType = typeof data
    let errMsg = simpleType
    if (['number', 'boolean'].includes(simpleType) || data === null) {
      errMsg += ` ${String(data)}`
    }

    throw new TypeError(`${errMsg} is not iterable (cannot read property Symbol(Symbol.iterator))`)
  }
}

Promise.prototype.race2 = function (promises) {
  return new Promise((rs, rj) => {
    try {
      // 检查输入值是否可迭代
      iteratorCheck(promises)

      let promiseStatusChanged = false
      for (let i = 0; i < promises.length; i++) {
        if (promiseStatusChanged) {
          break
        }
        // 使用 Promise.resolve 包装 thenable 和 非thenable 值
        Promise.resolve(promises[i]).then(rs).catch(rj).finally(() => {
          promiseStatusChanged = true
        })
      }
    } catch (e) {
      rj(e)
    }
  })
}