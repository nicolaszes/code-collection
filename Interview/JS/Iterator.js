/**
 * iterator 迭代器
 * es5 写法
 */
function createIterator (items) {
  var i = 0;
  return {
    next: function () {
      var done = (i >= items.length)
      var value = !done ? items[i++] : undefined

      return {
        done: done,
        value: value,
      }
    }
  }
}

var iterator = createIterator([1, 2, 3])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

/**
 * use generator
 */
function * createIterator (items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i]
  }
}

var iterator = createIterator([1, 2, 3])
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

function * createIterator () {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3
}

var iterator = createIterator()

/**
 * 第一次调用 next方法无论传入什么值都会被丢弃
 */
console.log(iterator.next())
console.log(iterator.next(4))
console.log(iterator.next(5))
console.log(iterator.next())

async function createIterator () {
  let first = await 1;
  let second = await first + 2;
  await second + 3
  console.log(first)
  console.log(second)
}

var it = createIterator()

/**
 * 第一次调用 next方法无论传入什么值都会被丢弃
 */
console.log(it)
