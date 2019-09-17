// var a = console.log(1)
if (a == 1 && a == 2 && a == 3) {
  console.log('1')
}

/**
 * 1.toString
 */
var a = {
  i: 1,
  toString () {
    return a.i++
  }
}

/**
 * 2.valueOf
 */
var a = {
  i: 1,
  valueOf() {
    return a.i++
  }
}

var a = {
  gn: (function* () {
    yield 1
    yield 2
    yield 3
  })(),
  valueOf() {
    return this.gn.next().value
  }
}

/**
 * 3.toPrimitive
 */
var a = {
  [Symbol.toPrimitive]: ((i) => () => ++i)(0)
}

var a = {
  i: 1,
  valueOf() {
    return a.i++
  },
  toString() {
    return a.i++
  },
  // Symbol.toPrimitive 优先级最高
  [Symbol.toPrimitive]() {
    return a.i++
  }
}

/**
 * a.join = a.shift
 */
var a = [1, 2, 3]
a.join = a.shift

/**
 * 5.defineProperty
 */
Object.defineProperty(window, 'a', {
  get: function () {
    return this.value = this.value ? (this.value += 1) : 1
  }
})