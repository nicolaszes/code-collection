/*
 * 数组的浅拷贝
 * 复制引用的方法称之为 浅拷贝
 */
var arr = ['old', 1, true, null, undefined];
var new_arr = arr.concat();
// var new_arr = arr.slice();
new_arr[0] = 'new';
console.log(arr);
console.log(new_arr);

/*
 * 嵌套了对象或者数组
 */
var arr = [{old: 'old'}, 1, true, null, undefined];
var new_arr = arr.concat();
new_arr[0].old = 'new';
console.log(arr);
console.log(new_arr);

/*
 * 深拷贝的实现方式
 * 方法缺陷是，不能拷贝函数
 */
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var new_arr = JSON.parse(JSON.stringify(arr));
new_arr[4].old = 4
console.log(arr);
console.log(new_arr);


var arr = [
  function(){ console.log(a)},
  {b: function(){console.log(b)}}
]
var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);

/*
 * 浅拷贝的实现
 */
var shallowCopy = function (obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据 obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {}
  // 遍历 obj，并且判断是 obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj
}

/*
 * 深拷贝的实现
 */
var deepCopy = function (obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据 obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
  }
  return newObj
}

var arr = ['old', 1, true, ['old1', 'old2'], {old: {new: 1}}]
var new_arr = JSON.parse(JSON.stringify(arr));
new_arr[4].old.new = 4
console.log(arr);
console.log(new_arr);
