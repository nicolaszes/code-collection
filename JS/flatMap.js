// 数组降维
[1, [2], 3].flatMap((v) => v + 1)
// -> [2, 3, 4]

/**
 * 1.trick
 */
arr.toString().split(',')
arr.join(',').split(',')

/**
 * 2.RegExp
 */
const flattenDeepOne = (arr) => JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

/**
 * 3.flat(Infinity)
 */
const flattenDeep = arr.flat(Infinity)

/**
 * 4.recursion
 */
const flattenDeepTwo = (arr) => Array.isArray(arr) ?
  arr.reduce((a, b) => [...a, ...flattenDeepTwo(b)], []) : [arr]
 
/**
 * 5.迭代
 */ 
const flattenDeepThree = (arr) => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

/**
 * 6.Generator
 */
function* flat(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      yield* flat(item); // Generator委托
    } else {
      yield item
    }
  }
}

const flattenDeepFourth = (arr) => {
  let result = [];
  for (let val of (flat(arr))) {
    result.push(val);
  }
  return result;
}

console.log(flatten(arr))

flattenDeep([1, [
  [2],
  [3, [4]], 5
]])