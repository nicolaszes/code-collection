/*
 * 返回函数的模拟实现
 */
Function.prototype.bind2 = function (context) {
  var self = this;
  return function () {
    return self.apply(context); // 绑定函数可能是有返回值的
  };
};

var foo = {
  value: 1
};

function bar() {
  return this.value;
}

var bindFoo = bar.bind(foo);
console.log(bindFoo()); // 1

/*
 * 传参的模拟实现
 */
// 第二版
Function.prototype.bind2 = function (context) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    // 这个时候的arguments是指bind返回的函数传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    console.log(bindArgs)
    return self.apply(context, args.concat(bindArgs));
  };
};

/*
 * 构造函数效果的模拟实现
 */
// 第三版
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype;
  return fBound;
};

/*
 * 构造函数效果的优化实现
 */
// 第四版
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

/*
 * 最终代码
 */
Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

const A = (a, b) => a + b
const B = (a, b, c) => a + b + c

Function.prototype.bind2 = function (content) {
  if (typeof this != "function") {
    throw Error("not a function")
  }
  
  // 若没问参数类型则从这开始写
  console.log(content, this)
  let fn = this;
  let args = [...arguments].slice(1);

  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
  }

  function tmp() {}
  tmp.prototype = this.prototype;
  resFn.prototype = new tmp();

  console.log(resFn.prototype.__proto__.constructor === this)

  return resFn;
}

var obj = {
  a: 1
}

function bar () {
  console.log(this.a)
}

bar.bind2(obj)()