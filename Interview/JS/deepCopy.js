/*
 * 数组的浅拷贝
 * 复制引用的方法称之为 浅拷贝
 */
var arr = ["old", 1, true, null, undefined];
var new_arr = arr.concat();
// var new_arr = arr.slice();
new_arr[0] = "new";
console.log(arr);
console.log(new_arr);

/*
 * 嵌套了对象或者数组
 */
var arr = [{ old: "old" }, 1, true, null, undefined];
var new_arr = arr.concat();
new_arr[0].old = "new";
console.log(arr);
console.log(new_arr);

/*
 * 深拷贝的实现方式
 * 方法缺陷是，不能拷贝函数
 */
var arr = ["old", 1, true, ["old1", "old2"], { old: 1 }];
var new_arr = JSON.parse(JSON.stringify(arr));
new_arr[4].old = 4;
console.log(arr);
console.log(new_arr);

var arr = [
  function() {
    console.log(a);
  },
  {
    b: function() {
      console.log(b);
    }
  }
];
var new_arr = JSON.parse(JSON.stringify(arr));

console.log(new_arr);

/*
 * 浅拷贝的实现
 */
var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== "object") return;
  // 根据 obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历 obj，并且判断是 obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/*
 * 深拷贝的实现
 */
var deepCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== "object") return;
  // 根据 obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
  }
  return newObj;
};

var arr = ["old", 1, true, ["old1", "old2"], { old: { new: 1 } }];
var new_arr = JSON.parse(JSON.stringify(arr));
new_arr[4].old.new = 4;
console.log(arr);
console.log(new_arr);


/**
 * 通常可以通过 JSON.parse(JSON.stringify(object)) 来解决。
 * 但是该方法也是有局限性的：
    会忽略 undefined
    会忽略 symbol
    不能序列化函数
    不能解决循环引用的对象
 */
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)

// 在遇到函数、 undefined 或者 symbol 的时候，该对象也不能正常的序列化
// 该方法会忽略掉函数和 undefined 。
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}

// 但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题，并且该函数是内置函数中处理深拷贝性能最快的。
// 如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel
function structuralClone(obj) {
  return new Promise(resolve => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

var obj = {
  a: 1, 
  b: {
    c: b
  }
}
// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
(async () => {
  const clone = await structuralClone(obj)
})()
