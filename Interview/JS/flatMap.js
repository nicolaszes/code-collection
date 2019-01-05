// 数组降维
[1, [2], 3].flatMap((v) => v + 1)
// -> [2, 3, 4]

const flattenDeep = (arr) => Array.isArray(arr)
  ? arr.reduce((a, b) => [...a, ...flattenDeep(b)] , [])
  : [arr]

flattenDeep([1, [[2], [3, [4]], 5]])
