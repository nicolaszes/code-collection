/**
 * 1.Infinity
 */
let a = Infinity
console.log(a === a - 1) // true

/**
 * 2.-Infinity
 */
let b = -Infinity
console.log(b === b - 1)  // true

console.log(Infinity + Infinity) // Infinity
console.log(Infinity - Infinity) // NaN
console.log(Infinity * Infinity) // Infinity
console.log(Infinity / Infinity) // NaN
console.log(Infinity * 0) // NaN

/**
 * 3.大于 1e45
 * 在 JavaScript里，整数可以被精确表示的范围是从 -2 ** 53 + 1 到 2 ** 53 - 1
 * 即 -9007199254740991到 9007199254740991。超过这个数值的整数，都不能被精确表示。
 */
let a = 1e45
console.log(a)	// 1e+45
console.log(a === a - 1) // true

/**
 * 4.Number.MIN_SAFE_INTEGER
 */
let a = Number.MIN_SAFE_INTEGER - 1
console.log(a === a - 1) // true

/**
 * 5.bigInt
 */
console.log(2 ** 2000) // Infinity
console.log(2n ** 2000n)


/**
 * 6.Object.defineProperty
 */
let count = 0
Object.defineProperty(window, 'a', {
  get() {
    let count = 0
    Object.defineProperty(this, 'a', {
      get() {
        return ++count
      }
    })
    return count
  },
  configurable: true,
})

console.log(a === a - 1) // true

/**
 * 7.with
 */
with({
  count: 0,
  get a() {
    return ++this.count
  }
}){
  console.log(a === a - 1) // true
}

/**
 * a == a - 1
 */
x = 1
a = { x, valueOf: () => a.x }
Object.defineProperty(a, 'x', { get() { return --x } })