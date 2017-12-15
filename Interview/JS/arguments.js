/**
 * 类数组对象: 拥有一个 length 属性和若干索引属性的对象
 * arguments 和 一些 DOM方法
 */
var array = ['name', 'age', 'sex'];
var arrayLike = {
  0: 'name',
  1: 'age',
  2: 'sex',
  length: 3
};

console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';

console.log(array.length);
console.log(arrayLike.length);

/**
 * 调用 push方法会出现错误
 */
arrayLike.push('4')

/**
 * Function.call 间接调用
 */
var arrayLike = {
  0: 'name',
  1: 'age',
  2: 'sex',
  length: 3
}

Array.prototype.join.call(arrayLike, '&');
Array.prototype.slice.call(arrayLike, 0);
Array.prototype.map.call(arrayLike, function (item) {
  return item.UpperCase();
});

/**
 * 类数组转数组的方法
 */
var arrayLike = { 0: 'name', 1: 'age', 2: 'sex', length: 3 };
// 1. slice
Array.prototype.slice.call(arrayLike);
// 2. splite
Array.prototype.slice.call(arrayLike);
// 3. apply
Array.prototype.concat.apply([], arrayLike);
// 4. ES6 Array.from
Array.from(arrayLike);
