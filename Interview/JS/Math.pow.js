[[3,2,1].reduce(Math.pow), [].reduce(Math.pow)]

// arr.reduce(callback[, initialValue])
// reduce接受两个参数, 一个回调, 一个初始值.
// 回调函数接受四个参数 previousValue, currentValue, currentIndex, array
// 需要注意的是 If the array is empty and no initialValue was provided, TypeError would be thrown.
// 所以第二个表达式会报异常. 第一个表达式等价于 Math.pow(3, 2) => 9; Math.pow(9, 1) =>9
