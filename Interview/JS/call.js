/*
 * call() 方法在使用一个指定的 this 值
 * 若干个指定的参数值的前提下调用某个函数或方法
 */
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}
bar.call(foo);

/*
 * step one
 * 将函数设为对象的属性
 * 执行该函数
 * 删除该函数
 */
var foo = {
  value: 1,
  bar: function() {
    console.log(this.value);
  }
};
foo.bar();

Function.prototype.call2 = function(context) {
  // 获取调用 call的函数
  context.fn = this;
  context.fn();
  delete context.fn;
};
// 测试一下
var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
}
bar.call2(foo);

/*
 * step two
 */
Function.prototype.call2 = function(context) {
  context.fn = this;
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  console.log(args);
  eval("context.fn(" + args + ")");
  delete context.fn;
};

// 测试一下
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar.call2(foo, "kevin", 18);

/*
 * step two
 */
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }

  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};

// 测试一下
var value = 2;

var obj = {
  value: 1
};

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  };
}

bar.call(null); // 2
console.log(bar.call2(obj, "kevin", 18));

/*
 * apply的模拟实现
 */
Function.prototype.apply = function(context, arr) {
  var context = object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }

  delete context.fn;
  return result;
};
