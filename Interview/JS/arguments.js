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


/**
 * arguments object
 */
function foo(name, age, sex) {
  console.log(arguments);
}

foo('name', 'age', 'sex')

/**
 * length 属性
 * Arguments对象的length属性，表示实参的长度，举个例子
 */
function foo(b, c, d){
  console.log("实参的长度为：" + arguments.length)
}
console.log("形参的长度为：" + foo.length)
foo(1)
// 形参的长度为：3
// 实参的长度为：1

/**
 * callee属性
 * Arguments 对象的 callee 属性，通过它可以调用函数自身。
 * 讲个闭包经典面试题使用 callee 的解决方法
 */
var data = [];
for (var i = 0; i < 3; i++) {
  (data[i] = function () {
    console.log(arguments.callee.i) 
  }).i = i;
}

data[0]();
data[1]();
data[2]();
// 0
// 1
// 2


/**
 * arguments 和对应参数的绑定
 */
function foo(name, age, sex, hobbit) {
  console.log(name, arguments[0]); // name name
  // 改变形参
  name = 'new name';
  console.log(name, arguments[0]); // new name new name
  // 改变arguments
  arguments[1] = 'new age';
  console.log(age, arguments[1]); // new age new age

  // 测试未传入的是否会绑定
  console.log(sex); // undefined
  sex = 'new sex';
  console.log(sex, arguments[2]); // new sex undefined
  arguments[3] = 'new hobbit';
  console.log(hobbit, arguments[3]); // undefined new hobbit
}
foo('name', 'age')

/**
 * 传递参数
 */
function foo () {
  bar.apply(this, arguments)
}

function bar (a, b, c) {
  console.log(a, b, c);
}

foo(1, 2, 3)

function baz (...arguments) {
  console.log(arguments)
}
foo(4, 5, 6)