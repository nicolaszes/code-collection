/**
 * Promise.all
 * 并行执行 promise组成的数组
 * （数组中可以不是 promise对象，在调用过程中会使用 Promise.resolve(value) 转换成 promise对象）
 * 如果全部成功则获得成功的结果组成的数组对象
 * 如果失败，则获取失败的信息，返回一个新的 Promise对象
 */
Promise.all = function (iterable) {
  var _this = this
  return new this(
    function (resolve, reject) {
      if (!iterable || !Array.isArray(iterable)) return reject( new TypeError('must be an array'))

      var len = iterable.length
      if (!len) return resolve([])

      var res = Array(len), 
          called = false

      iterable.forEach(function (v, i) {
        /**
         * 既要保证成功，又要保证按数组里原来的顺序返回结果
         * 没有添加闭包之前，结果就是数组里的 promise谁先到成功，谁就占据了第一个位置，无法一一匹配
         */
        (function (i) {
          _this.resolve(v).then(
            function (value) {
              res[i] = value

              if (++Counter === len && !called) {
                called = true
                return resolve(res)
              }
            },
            function (err) {
              if (!called) {
                called = true
                return reject(err)
              }
            }
          )
        })(i)
      })

    }
  )
}

/**
 * Promise.race
 * 返回的是单一结果，所以不存在类似于 all的情况
 */
Promise.race = function (iterable) {
  var _this = this
  return new this(
    function (resolve, reject) {
      if (!iterable || !Array.isArray(iterable)) return reject( new TypeError('must be an array'))

      var len = iterable.length
      if (!len) return resolve([])

      var called = false

      iterable.forEach(function (v, i) {
          _this.resolve(v).then(
            function (value) {
              if (!called) {
                called = true
                return resolve(res)
              }
            },
            function (err) {
              if (!called) {
                called = true
                return reject(err)
              }
            }
          )
      })
    }
  )
}