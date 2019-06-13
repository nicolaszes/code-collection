// 数组降维
[1, [2], 3].flatMap((v) => v + 1)
// -> [2, 3, 4]

const flattenDeep = (arr) => Array.isArray(arr)
  ? arr.reduce((a, b) => [...a, ...flattenDeep(b)] , [])
  : [arr]

const flattenDeep2 = arr.flat(Infinity)

flattenDeep([1, [[2], [3, [4]], 5]])
