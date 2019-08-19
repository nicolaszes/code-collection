const promisify = require('util').promisify
const path = require('path')
const fs = require('fs')
const readFile = promisify(fs.readFile)

function run(gen) {
  const g = gen()

  function next(data) {
    const res = g.next(data)
    // 深度递归，只要 `Generator` 函数还没执行到最后一步，`next` 函数就调用自身
    if (res.done) return res.value
    res.value.then(function (data) {
      next(data)
    })
  }
  next()
}
run(function* () {
  const res1 = yield readFile(path.resolve(__dirname, '../data/a.json'), {
    encoding: 'utf8'
  })
  console.log(res1)
  // {
  //   "a": 1
  // }
  const res2 = yield readFile(path.resolve(__dirname, '../data/b.json'), {
    encoding: 'utf8'
  })
  console.log(res2)
  // {
  //   "b": 2
  // }
})